import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Container from "./Container";

import SortableItem from "./SortableItems";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import CreateTaskModal from "../common/CreateTaskModal";
import { changeTaskStatus } from "../../redux/actions/task-actions";

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "2%",
  padding: "30px",
  marginLeft: "4%",
};

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

const Board = () => {
  const [items, setItems] = useState({});
  const [activeId, setActiveId] = useState();
  const { isAuthenticated, userColumn } = useSelector((state) => state.user);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userColumn.length > 0) {
      const newItems = userColumn.reduce((acc, column) => {
        const filteredTasks = column.taskIds.filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase())
        );
        acc[column._id] = filteredTasks; // Store the filtered array of task objects
        return acc;
      }, {});
      setItems(newItems);
    }
  }, [search, userColumn]);
  return (
    <>
      <div className="filter-div">
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#2196f3", width: "10vw" }}
          onClick={() => setShowDialog(true)}
        >
          Add task
        </Button>
        <div className="search-sort">
          <div className="search-div">
            <p>Search</p>
            <TextField
              id="outlined-basic"
              label="Search...."
              variant="outlined"
              size="small"
              sx={{ width: "20vw" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* ================================did not implemented the sort fucntionlity as the requirements were not clear ======================== */}
         
        </div>
      </div>
      <div style={wrapperStyle}>
        <DndContext
          announcements={defaultAnnouncements}
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(items).map(([columnId, taskIds]) => (
            <Container
              key={columnId}
              id={columnId}
              items={taskIds}
              title={
                userColumn.find((col) => col._id === columnId)?.title ||
                "Untitled"
              }
            />
          ))}

          <DragOverlay>
            {activeId ? <SortableItem id={activeId} task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
        <CreateTaskModal open={showDialog} close={() => setShowDialog(false)} />
      </div>
    </>
  );

  function findContainer(taskId) {
    return Object.keys(items).find((columnId) =>
      items[columnId].some((task) => task._id === taskId)
    );
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    for (const column of userColumn) {
      const task = column.taskIds.find((task) => task._id === id);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const activeTaskId = active.id;

    if (!over) return; // No column is being hovered over

    const overContainer = over.data.current?.sortable?.containerId; // The column ID where the task is dropped
    const activeContainer = findContainer(activeTaskId); // Find the current column of the task

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeTasks = prev[activeContainer];
      const overTasks = prev[overContainer];

      return {
        ...prev,
        [activeContainer]: activeTasks.filter(
          (task) => task._id !== activeTaskId
        ), // Remove from active container
        [overContainer]: [
          ...overTasks,
          activeTasks.find((task) => task._id === activeTaskId),
        ], // Add to the new container
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const activeTaskId = active.id;
    if (!over) {
      return;
    }
    const overContainer = over?.id;
    const activeContainer = findContainer(activeTaskId);
    const status = getStatusByColumnId(overContainer);
    if (status === null) {
      return;
    }
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeTasks = prev[activeContainer] || [];
      const overTasks = prev[overContainer] || [];

      return {
        ...prev,
        [activeContainer]: activeTasks.filter((id) => id !== activeTaskId),
        [overContainer]: [...overTasks, activeTaskId],
      };
    });

    dispatch(changeTaskStatus(activeTaskId, status));
    setActiveId(null);
  }

  // Helper function to get the status code of a column
  function getStatusByColumnId(columnId) {
    const column = userColumn.find((col) => col._id === columnId);
    if (!column) {
      return null;
    }

    switch (column.title) {
      case "TO DO":
        return 0; // Status code for TO DO
      case "IN PROGRESS":
        return 1; // Status code for IN PROGRESS
      case "DONE":
        return 2; // Status code for DONE
      default:
        return null;
    }
  }
};

export default Board;
