import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_please_change_in_production'
)

export type AuthPayload = {
  eventId: string
  participantId: string
  email: string
  role: 'organizer' | 'participant'
}

export async function signToken(payload: AuthPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY)
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as AuthPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
