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
import { Project } from "@/action/dummyData";

export default function Board(Project: Project) {
  const { data, setData } = useProjectStore((state) => state);

  React.useEffect(() => {
    setData(Project);
    console.log(data);
  }, [Project, setData, data]);

  const onDragEnd = (result: DropResult): void => {
    const { destination, draggableId, source, type } = result;

    console.log(type, destination);

    if (!result.destination) {
      return;
    }

    if (
      source.droppableId === destination?.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "COLUMN") {
      const prevData = data;
      const removedData = prevData.columns!!.splice(source.index, 1);
      prevData.columns!!.splice(destination!!.index, 0, removedData[0]);

      setData(prevData);
    }

    if (type === "TASK") {
      const prevData = data;

      const oldColumnIndex = prevData.columns!!.findIndex(
        (column) => column._id === source.droppableId
      );
      const newColumnIndex = prevData.columns!!.findIndex(
        (column) => column._id === destination!!.droppableId
      );

      const [removedData] = prevData.columns!![oldColumnIndex].tasks.splice(
        source.index,
        1
      );

      prevData.columns!![newColumnIndex].tasks.splice(
        destination!!.index,
        0,
        removedData
      );

      const updateColumns = prevData.columns!!.map((column) => ({
        _id: column._id,
        tasks: column.tasks.map((task, index) => ({
          _id: task._id,
          position: index,
        })),
      }));

      console.log(updateColumns);

      setData(prevData);
    }
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
            {data.columns ? (
              data.columns.map((column, idx) => (
                <Column
                  columnDraggableId={column._id}
                  columnDroppableId={column._id}
                  index={idx}
                  key={column._id}
                  {...column}
                />
              ))
            ) : (
              <></>
            )}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
