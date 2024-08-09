import { Button, Input } from "@nextui-org/react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { FrameIcon } from "../ui/icons/FrameIcon";
import { PriorityIcon } from "../ui/icons/PriorityIcon";
import React from "react";
import clsx from "clsx";

interface AddTaskItemProps {
  title: string;
  className: String;
}

export default function AddTaskItem(Task: AddTaskItemProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          startContent={<span>+</span>}
          className={clsx("bg-white border-1", Task.className)}
        >
          {Task.title}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <>
          <Input placeholder="title"></Input>
          <PropertyItem />
        </>
        <div className="flex gap-1 items-center w-full">
          <FrameIcon />
          <span>Status</span>
          <select>
            <option value="Low"></option>
            <option value="Medium"></option>
            <option value="High"></option>
          </select>
        </div>
        <div className="flex gap-1 items-center w-full">
          <PriorityIcon />
          <span>Priority</span>
          <select className="bg-white">
            <option value="">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const PropertyItem = () => {
  return (
    <div className="flex gap-1 items-center w-full">
      <FrameIcon />
      <span>Status</span>
      <select>
        <option value="Low"></option>
        <option value="Medium"></option>
        <option value="High"></option>
      </select>
    </div>
  );
};
