import { redirect } from "next/navigation";

export default function SignUpPage() {
  // This will redirect to our custom auth page
  redirect('/auth');
}
