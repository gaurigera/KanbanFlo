"use client";

import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import * as React from "react";
import TaskItem from "../board/taskItem";
import { Chip } from "@nextui-org/react";
import { Dot } from "lucide-react";
import { Column as ColumnType } from "@/action/dummyData";
import TaskSheet from "./taskSheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface ColumnProps extends ColumnType {
  columnDraggableId: string;
  columnDroppableId: string;
  index: number;
}

type Theme = {
  chipBg?: string;
  dotBg?: string;
  borderColor?: string;
};

type ThemeMap = {
  [key: string]: Theme;
};

const themeMap: ThemeMap = {
  blue: {
    chipBg: "bg-blue-100",
    dotBg: "text-blue-400",
    borderColor: "border-2 border-blue-300",
  },
  rose: {
    chipBg: "bg-rose-100",
    dotBg: "text-rose-500",
    borderColor: "border-2 border-rose-300",
  },
  yellow: {
    chipBg: "bg-yellow-100",
    dotBg: "text-yellow-500",
    borderColor: "border-2 border-yellow-300",
  },
  orange: {
    chipBg: "bg-orange-100",
    dotBg: "text-orange-500",
    borderColor: "border-2 border-orange-400",
  },
  purple: {
    chipBg: "bg-purple-100",
    dotBg: "text-purple-500",
    borderColor: "border-2 border-purple-400",
  },
};

export default function Column(Details: ColumnProps) {
  const pathname = usePathname();

  const createQueryString = React.useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);
  return (
    <>
      <Draggable draggableId={Details.columnDraggableId} index={Details.index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            className={clsx(
              "space-y-2 p-2",
              snapshot.isDragging && themeMap[Details.theme]["borderColor"]
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Chip
              className={clsx(themeMap[Details.theme]["chipBg"])}
              startContent={
                <Dot
                  className={clsx(themeMap[Details.theme]["dotBg"])}
                  strokeWidth={`8px`}
                />
              }
            >
              {Details.name}
            </Chip>
            <Droppable droppableId={Details.columnDroppableId} type="TASK">
              {(provided, snapshot) => {
                return (
                  <div
                    className={clsx(
                      "space-y-3 min-w-72",
                      snapshot.isDraggingOver &&
                        themeMap[Details.theme]["borderColor"]
                    )}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {Details.tasks.map((task, idx) => (
                      <TaskItem
                        key={task._id}
                        draggableId={task._id}
                        index={idx}
                        {...task}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <div className="mt-5">
              <TaskSheet id="">
                <Link
                  href={
                    pathname + "?" + createQueryString("columnId", Details._id)
                  }
                >
                  <Button variant="outline">Add New</Button>
                </Link>
              </TaskSheet>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
