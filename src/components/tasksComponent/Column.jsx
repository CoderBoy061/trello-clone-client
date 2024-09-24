import React from "react";
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

 const SortableItem = ({ id, task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default SortableItem;
