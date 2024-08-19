"use client";

import { Chip } from "@nextui-org/react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { MessageCircle, MoveRight } from "lucide-react";
import React from "react";
import TaskSheet from "./taskSheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export interface TaskProps {
  _id: string;
  title: string;
  description: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  commentCount: number;
  position: number;
}

interface DraggableTaskProps extends TaskProps {
  draggableId: string;
  index: number;
}

export default function TaskItem(Task: DraggableTaskProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Draggable draggableId={Task.draggableId} index={Task.index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={clsx(
            "max-w-72 space-y-2.5 p-3 bg-white border-1 rounded-lg",
            snapshot.isDragging && "border-2 border-blue-300"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskSheet>
            <Link href={pathname + "?" + createQueryString("taskId", Task._id)}>
              <p className="font-semibold text-pretty">{Task.title}</p>
              <p className="text-xs">{Task.description}</p>
            </Link>
          </TaskSheet>
          <div className="flex justify-between">
            <Chip
              className={clsx(
                "text-xs p-0",
                Task.priority === "LOW" && " bg-success-100/35 text-green-600",
                Task.priority === "MEDIUM" && "bg-warning-50 text-yellow-800",
                Task.priority === "HIGH" && "bg-red-500/10 && text-red-900"
              )}
            >
              {Task.priority}
            </Chip>
            {/* <div className="flex gap-0.5">
              <Avatar className="w-5 h-5" />
              <Avatar className="w-5 h-5" />
              <Avatar className="w-5 h-5" />
            </div> */}
          </div>
          <div className="flex flex-row-reverse justify-between">
            <div className="flex gap-1 text-xs items-center">
              <MessageCircle width={15} />
              <span>{Task.commentCount}</span>
            </div>
            <div className="flex gap-1 text-tiny items-center">
              <span>2024-08-23</span>
              <span>
                <MoveRight width={10} />
              </span>
              <span>2024-09-06</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
