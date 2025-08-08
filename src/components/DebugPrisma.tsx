import { prisma } from '@/lib/db'

export default function DebugPrisma() {
  // Log all available models in the Prisma client
  console.log('Available Prisma models:', Object.keys(prisma));
  
  return (
    <div>
      <h3>Debug: Prisma Models</h3>
      <pre>{JSON.stringify(Object.keys(prisma), null, 2)}</pre>
    </div>
  );
}
