"use client";

import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";

export default function Board() {
  const onDragEnd = (result: DropResult): void => {
    return;
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <>
          <Droppable droppableId="board">
            {(provided: DroppableProvided) => <></>}
          </Droppable>
        </>
      </DragDropContext>
    </>
  );
}
