"use client";

interface LoginValues {
  email: String;
  password: String;
}

import {PasswordInput} from "@/components/ui/passwordInput";
import saveUserTokens from "@/utils/auth/saveUserToken";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Login() {
  const methods = useForm<LoginValues>();
  
  const { register, formState } = methods;
  const router = useRouter()

  const onSubmit = async (values: LoginValues) => {    
    const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    saveUserTokens(data)

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
