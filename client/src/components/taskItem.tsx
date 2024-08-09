"use client";

import { Chip } from "@nextui-org/react";
import { ClockIcon } from "./ui/icons/ClockIcon";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import clsx from "clsx";

export default function TaskItem() {
  return (
    <Draggable draggableId="b" index={2}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={clsx(
            "max-w-64 space-y-1.5 p-3 bg-gray-50 border-2 rounded-lg m-2",
            snapshot.isDragging && "border-2 border-blue-300"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>Implement User Authentication</p>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            libero, quasi impedit beatae pariatur cumque veritatis!
          </p>
          <Chip color="danger">Urgent</Chip>
          <div className="flex gap-2 text-xs">
            <ClockIcon />
            <span>2024-08-23</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
