"use client";

import * as React from "react";

export default function ProjectForm() {
  const [showInput, setShowInput] = React.useState(false);
  const [projects, setProjects] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");

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
  };

  const saveProject = () => {
    setProjects((prev) => [...prev, inputValue.trim()]);
    setShowInput(false);
  };

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="font-bold">Projects</h1>
        <button onClick={handleClick}>+</button>
      </div>
      <>
        {projects.map((project: string, idx: number) => {
          return <p key={idx}>{project}</p>;
        })}
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
