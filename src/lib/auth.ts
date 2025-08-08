import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export function generateToken(user: UserPayload): string {
  console.log('Generating token with secret:', JWT_SECRET ? 'Secret exists' : 'Secret missing');
  console.log('Generating token for user:', user);
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
  console.log('Generated token:', token.substring(0, 50) + '...');
  return token;
}

export function verifyToken(token: string): UserPayload | null {
  try {
    console.log('Verifying token with secret:', JWT_SECRET ? 'Secret exists' : 'Secret missing');
    console.log('Token to verify:', token.substring(0, 50) + '...');
    const result = jwt.verify(token, JWT_SECRET) as UserPayload;
    console.log('Token verification successful:', result);
    return result;
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
}

export function getTokenFromCookies(): string | null {
  const cookieStore = cookies();
  return cookieStore.get('auth-token')?.value || null;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('auth-token')?.value || null;
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  try {
    const token = getTokenFromCookies();
    if (!token) return null;
    
    return verifyToken(token);
  } catch (error) {
    // In case cookies() is not available (like during build time)
    return null;
  }
}

export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
}
