import { auth } from "@/lib/auth";
import SignInView from "@/module/auth/views/signInView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) redirect("/");
  return <SignInView />;
}
