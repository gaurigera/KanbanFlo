import PasswordInput from "@/ui/PasswordInput";
import { Button, Input, Link } from "@nextui-org/react";
export default function Signin() {
  return (
    <form className="space-y-2 w-full">
      <Input type="text" placeholder="Full Name" />
      <Input type="email" placeholder="Your Email" />
      <PasswordInput />
      <Button
        type="submit"
        className="w-full bg-indigo-400 text-white shadow-lg"
      >
        Login
      </Button>
      <p>
        Already Have an Account? <Link href="/auth/login">Log in</Link>
      </p>
    </form>
  );
}
