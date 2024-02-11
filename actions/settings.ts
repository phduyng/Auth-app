"use server"

import bcrypt from 'bcryptjs';
import { currentUser } from "@/lib/auth";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail, getUserById } from "../data/user";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerifiCationToken } from "@/lib/tokens";
import { update } from '@/auth';


export const settings = async ( values: z.infer<typeof SettingsSchema> ) => {
    const user = await currentUser()

    if(!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
      }

    if (values.email && values.email !== user.email) {
        const existingUser =  await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in user!" }
        }

        const verificationToken = await generateVerifiCationToken(
            values.email
          );
          
          await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
          );
      
          return { success: "Verification email sent!" };
    }

    if(values.password && values.newPassword && dbUser.password) {
        const pwdMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        )

        if(!pwdMatch) {
            return { error: "Incorret password!" }
        }

        const hashedPwd = await bcrypt.hash(
            values.newPassword,
            10
        )

        values.password = hashedPwd;
    values.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
          ...values,
        }
      });
    
      update({
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
          role: updatedUser.role,
        }
      });

    return { success: "Settings Updated!" }
}