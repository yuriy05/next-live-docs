import { JSX } from "react";
import { SignUp } from "@clerk/nextjs";

function SignUpPage(): JSX.Element {
  return (
    <main className="auth-page">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
