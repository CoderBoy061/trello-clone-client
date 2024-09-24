import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "./SortableItems";

const Container = ({ id, items, title }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={rectSortingStrategy}
      disabled={false}
    
    >
      <div ref={setNodeRef} className="main-column">
        <h2>{title}</h2>

        {items && items.length > 0 ? (
          items.map((task) => (
            <SortableItem key={task._id} id={task._id} task={task} />
          ))
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </SortableContext>
  );
};

export default Container;
