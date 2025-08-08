import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

console.log('JWT_SECRET:', JWT_SECRET);

// Test token generation and verification
const testUser = { id: '1', email: 'test@test.com', name: 'Test User' };
const token = jwt.sign(testUser, JWT_SECRET, { expiresIn: '7d' });

console.log('Generated token:', token);

try {
  const verified = jwt.verify(token, JWT_SECRET);
  console.log('Verified user:', verified);
} catch (error) {
  console.log('Verification error:', error);
}

export async function GET() {
  return Response.json({ 
    message: 'JWT Test completed - check console',
    secret: JWT_SECRET ? 'Available' : 'Missing',
    token: token.substring(0, 50) + '...'
  });
}
