"use client";

import { Button, Input } from "@nextui-org/react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import React from "react";
import clsx from "clsx";
import Selector, { Item } from "../task/status";
import {
  CalendarCheck,
  CircleAlert,
  CirclePower,
  Loader,
  Users,
} from "lucide-react";
import Comment from "../task/comment";
import DatePicker from "../task/date-Picker";
import { dummyData, Task } from "@/utils/dummyData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AddTaskItemProps {
  title?: string;
  className?: String;
  children?: React.ReactNode;
}

function findTaskById(taskId: string): Task | undefined {
  // Iterate through each project
  for (const project of dummyData) {
    // Iterate through each column in the project
    if (project.columns) {
      for (const column of project.columns) {
        // Find the task with the given ID in the column's tasks
        const task = column.tasks.find((task: Task) => task._id === taskId);
        if (task) {
          return task;
        }
      }
    }
  }

  return undefined;
}

export default function TaskSheet(task: AddTaskItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [TaskData, setTaskData] = React.useState<Task>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (searchParams.has("taskId")) {
      const result = findTaskById(searchParams.get("taskId")!!);
      setTaskData(result);
    }
  }, [searchParams]);

  return (
    <Sheet
      open={
        searchParams.has("columnId") || searchParams.has("taskId") || isOpen
      }
      onOpenChange={(open: boolean) => {
        if (!open) {
          router.push(pathname);
          setIsOpen(false);
        }
      }}
    >
      <SheetTrigger asChild>
        {task.children ? (
          task.children
        ) : (
          <Button
            onClick={() => setIsOpen(true)}
            startContent={<span>+</span>}
            className={clsx("bg-white border-1", task.className)}
          >
            {task.title}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex min-w-[1096px]">
        <form className="space-y-3 flex-1">
          <Input label="title" variant="underlined" value={TaskData?.title} />
          <div className="flex items-center w-full justify-between">
            <div className="flex gap-1.5">
              <Loader width={13} />
              <span>Status</span>
            </div>
            <Selector defaultValue={TaskData?.priority} Props={PriorityList} />
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex gap-1.5">
              <CircleAlert width={13} />
              <span>Priority</span>
            </div>
            <Selector defaultValue={TaskData?.priority} Props={PriorityList} />
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex gap-1">
              <CirclePower width={13} />
              <span>Start Date</span>
            </div>
            <DatePicker date={TaskData?.startDate} />
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex gap-1">
              <CalendarCheck width={13} />
              <span>End Date</span>
            </div>
            <DatePicker date={TaskData?.endDate} />
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex gap-1">
              <Users width={13} />
              <span>Assignees</span>
            </div>
            <Selector Props={PriorityList} />
          </div>
        </form>
        <div className="space-y-1 w-2/3">
          <h1 className="text-sm text-black/80 italic">Comments</h1>
          <div className="space-y-3">
            {TaskData?.comments.map((comment, idx) => (
              <Comment {...comment} key={idx} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const PriorityList: Item[] = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];
