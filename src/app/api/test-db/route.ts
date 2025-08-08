import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Test database connection by counting users
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
    
    // Test if we can read from other tables
    const gameCount = await prisma.game.count();
    console.log('Game count:', gameCount);
    
    const topicCount = await prisma.topicCount.count();
    console.log('Topic count:', topicCount);

    // Get database connection info (without exposing sensitive data)
    const dbUrl = process.env.DATABASE_URL;
    const isConnected = !!dbUrl;
    const dbType = dbUrl?.includes('postgresql') ? 'PostgreSQL' : 'Unknown';
    const host = dbUrl?.match(/[@]([^:]+)/)?.[1] || 'Unknown';

    return NextResponse.json({
      status: 'Connected',
      database: {
        type: dbType,
        host: host,
        connected: isConnected
      },
      counts: {
        users: userCount,
        games: gameCount,
        topics: topicCount
      },
      message: 'Database connection is working properly!'
    });

  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed'
    }, { status: 500 });
  }
}
