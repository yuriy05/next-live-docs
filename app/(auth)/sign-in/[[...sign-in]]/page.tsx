import { JSX } from "react";
import { SignIn } from "@clerk/nextjs";

function SignInPage(): JSX.Element {
  return (
    <main className="auth-page">
      <SignIn />
    </main>
  );
}

export default SignInPage;
