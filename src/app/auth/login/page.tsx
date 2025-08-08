import { redirect } from "next/navigation";

export default function LoginPage() {
  // This will redirect to our custom auth page
  redirect('/auth');
}
