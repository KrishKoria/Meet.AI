import { auth } from "@/lib/auth";
import SignUpView from "@/module/auth/views/signUpView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) redirect("/meetings");
  return <SignUpView />;
}
