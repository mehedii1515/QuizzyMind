import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('Testing quiz creation API...');
    
    // Test the game API
    const testData = {
      topic: "JavaScript",
      type: "mcq",
      amount: 1
    };

    const response = await fetch('http://localhost:3000/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Game API response status:', response.status);
    
    const data = await response.json();
    console.log('Game API response data:', data);

    return NextResponse.json({
      status: response.ok ? 'Success' : 'Error',
      gameApiStatus: response.status,
      responseData: data,
      testData
    });

  } catch (error) {
    console.error('Quiz creation test error:', error);
    
    return NextResponse.json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
