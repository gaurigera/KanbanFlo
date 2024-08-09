"use client";

import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import Column from "./column";

export default function Board() {
  const onDragEnd = (result: DropResult): void => {
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided: DroppableProvided) => (
          <section
            className="w-full h-full bg-red-600 flex"
            ref={provided.innerRef}
          >
            <Column />
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
