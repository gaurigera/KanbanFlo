"use client";

export interface LoginValues {
  email: String;
  password: String;
}

import {PasswordInput} from "@/components/ui/passwordInput";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { loginUser } from "@/action/auth";

export default function Login() {
  const methods = useForm<LoginValues>();
  
  const { register, formState } = methods;
  const router = useRouter()

  const onSubmit = async (values: LoginValues) => {    
    const res = await loginUser(values)
    console.log(res);

    router.push("/home")
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-2 w-full"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input type="email" placeholder="Your Email" {...register("email")} />
        <PasswordInput {...register("password")} />
        <Button
          type="submit"
          className="w-full bg-indigo-400 text-white shadow-lg"
          disabled={formState.isSubmitting}
        >
          Login
        </Button>
        <p>
          Don't have an account? Create a{" "}
          <Link href="/auth/signin" className="text-blue-400">
            new account
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
