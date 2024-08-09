"use client";

import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import TaskItem from "../taskItem";

export default function Column() {
  return (
    <>
      <Draggable draggableId="a" index={1}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            className={clsx(
              "bg-white border-4",
              snapshot.isDragging && "bg-green-50"
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TaskItem />
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
}
