'use server'
import { SignJWT, jwtVerify, decodeJwt } from 'jose'
import { SessionPayload } from '../definitions'
// import * from 'jose/jw'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    // const payload = decodeJwt(session)
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
