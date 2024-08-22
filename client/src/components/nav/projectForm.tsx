"use client";

import { addProject } from "@/action/project";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function ProjectForm() {
  const [showInput, setShowInput] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter()

  const handleClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveProject();
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      saveProject();
    }
    setShowInput(false)
  };

  const saveProject = async () => {
    const result = await addProject(inputValue);
    if (result.success) {
      router.push(result.projectId);
      router.refresh()
    }
    setShowInput(false);
    setInputValue("")
  };

  return (
    <section>
      <div className="flex justify-between">
        <h1>Projects</h1>
        <button onClick={handleClick}>+</button>
      </div>
      <>
        {showInput && (
          <input
            autoFocus
            onBlur={handleInputBlur}
            className="max-w-36"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        )}
      </>
    </section>
  );
}
