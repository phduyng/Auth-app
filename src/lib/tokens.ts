import { v4 as uuidv4 } from "uuid";
import crypto from "crypto"
import { getVerificationTokenByEmail } from "../../data/vericification-token";
import db from "./db";
import { getPasswordResetTokenByEmail } from "./pwd-reset-token";
import { getTwoFactorTokenByEmail } from "../../data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  
    const existingToken = await getTwoFactorTokenByEmail(email);
  
    if (existingToken) {
      await db.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        }
      });
    }
  
    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      }
    });
  
    return twoFactorToken;
  }

export const generatePassworkResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passworkResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passworkResetToken
}

export const generateVerifiCationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000 )

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    
    return verificationToken;
}
