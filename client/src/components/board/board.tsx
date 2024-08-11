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
import { useProjectStore } from "@/lib/provider/project-provider";
import React from "react";
import { Project } from "@/utils/dummyData";


export default function Board(Project: Project) {
  const onDragEnd = (result: DropResult): void => {
    return;
  };

  const { setData } = useProjectStore((state) => state);

  React.useEffect(() => {
    setData(Project);
  }, [Project]);

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
            {Project.columns.map((column, idx) => (
              <Column
                columnDraggableId={column._id}
                columnDroppableId={column._id}
                index={column.position}
                key={idx}
                {...column}
              />
            ))}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
