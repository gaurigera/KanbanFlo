import PasswordInput from "@/ui/PasswordInput";
import { Button, Input, Link } from "@nextui-org/react";
export default function Login() {
  return (
    <form className="space-y-2 w-full">
      <Input type="email" placeholder="Your Email" />
      <PasswordInput />
      <Button
        type="submit"
        className="w-full bg-indigo-400 text-white shadow-lg"
      >
        Login
      </Button>
      <p>
        Don't have an account? Create a <Link href="/auth/signin">new account</Link>
      </p>
    </form>
  );
}
