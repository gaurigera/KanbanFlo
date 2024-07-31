import { Button, Input, Select } from "@nextui-org/react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {FrameIcon} from "./ui/icons/FrameIcon"

export default function AddTaskItem() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button endContent={"+"}>Create New Task</Button>
      </SheetTrigger>
      <SheetContent>
        <div>
          <Input placeholder="title"></Input>
          <PropertyItem />
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
