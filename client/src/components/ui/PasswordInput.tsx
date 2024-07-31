"use client"

import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../components/ui/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/ui/icons/EyeSlashFilledIcon";

export default function PasswordInput() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      placeholder="Enter your password"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
