"use client";

import { Button, Input } from "@nextui-org/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
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
import { Task } from "@/action/dummyData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getTask } from "@/action/task";

interface AddTaskItemProps {
  title?: string;
  className?: String;
  children?: React.ReactNode;
}

export default function TaskSheet(task: AddTaskItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [TaskData, setTaskData] = React.useState<Task>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchTask() {
      const result = await getTask(searchParams.get("taskId"));

      console.log(result);

      setTaskData(result);
    }

    if (searchParams.has("taskId")) {
      fetchTask();
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
      <SheetContent className="min-w-[1096px]">
        <SheetTitle>Task</SheetTitle>
        <div className="flex">
          <form className="space-y-3 flex-1">
            <Input label="title" variant="underlined" value={TaskData?.title} />
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-1.5">
                <Loader width={13} />
                <span>Status</span>
              </div>
              <Selector defaultValue={TaskData?.status} Props={PriorityList} />
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-1.5">
                <CircleAlert width={13} />
                <span>Priority</span>
              </div>
              <Selector
                defaultValue={TaskData?.priority}
                Props={PriorityList}
              />
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
