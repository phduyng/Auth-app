"use server"

import * as z from "zod";
import { generatePassworkResetToken } from '@/lib/tokens';
import { getUserByEmail } from '../data/user';
import { ResetSchema } from './../src/schemas/index';
import { sendPasswordResetEmail } from '@/lib/mail';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email not founded!" }
    }

    // TODO: Generate token & send email
    const passworkResetToken = await generatePassworkResetToken(email)

    await sendPasswordResetEmail(
        passworkResetToken.email,
        passworkResetToken.token
    )

    return { success: "Reset email send!" }
}