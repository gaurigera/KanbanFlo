"use client";

import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import * as React from "react";
import TaskItem from "../taskItem";
import { Chip } from "@nextui-org/react";
import { Dot } from "lucide-react";

export default function Column() {
  return (
    <>
      <Draggable draggableId="a" index={1}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            className={clsx("h-full space-y-2 p-2", snapshot.isDragging && "border-2 border-rose-50")}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <>
              <Chip className="bg-rose-100" startContent={<Dot className="text-rose-500" strokeWidth={`8px`} />}>
                Todo
              </Chip>
            </>
            <Droppable droppableId="a">
              {(provided, snapshot) => {
                return (
                  <div
                    className={clsx(
                      "h-full",
                      snapshot.isDraggingOver && "border-2 border-rose-300"
                    )}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {provided.placeholder}
                    <TaskItem />
                  </div>
                );
              }}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}
