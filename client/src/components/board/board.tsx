"use client";

import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "@hello-pangea/dnd";
import Column from "./column";
import clsx from "clsx";

export default function Board() {
  const onDragEnd = (result: DropResult): void => {
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <section
            className={clsx("w-full h-5/6 flex")}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <Column />
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
