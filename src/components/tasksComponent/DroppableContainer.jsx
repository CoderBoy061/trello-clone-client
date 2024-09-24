// DroppableContainer.jsx
import React from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableItem from "./Column";

export const DroppableContainer = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id, // Each column is a droppable zone
  });

  return (
    <div className="column">
      <h2>{column.title}</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={rectSortingStrategy}
      >
        <div className="task-list" ref={setNodeRef}>
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
