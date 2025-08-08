import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  // Redirect all signin requests to our custom auth page
  redirect('/auth');
}

export async function POST(request: NextRequest) {
  // Redirect all signin requests to our custom auth page
  redirect('/auth');
}
