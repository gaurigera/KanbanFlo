import { Button, Input } from "@nextui-org/react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FrameIcon } from "./ui/icons/FrameIcon";
import { PriorityIcon } from "./ui/icons/PriorityIcon";
import React from "react";

interface AddTaskItemProps {
  // Define the props interface
  title: string;
}

export default function AddTaskItem(Task: AddTaskItemProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button endContent={<span>+</span>} className="bg-neutral-50">
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
