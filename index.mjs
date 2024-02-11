import { v4 as uuidv4 } from 'uuid'
import crypto from "crypto"

const token = crypto.randomInt(100_000, 1_000_000).toString()

console.log('token: ' + token)