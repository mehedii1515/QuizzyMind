import { redirect } from "next/navigation";

export default function SignInPage() {
  // This will redirect to our custom auth page
  redirect('/auth');
}
