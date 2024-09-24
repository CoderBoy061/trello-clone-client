// function handleDragOver(event) {
// const { active, over, draggingRect } = event;
// const { id } = active;

// if (!over) {
// return;
// }

// const { id: overId } = over;
// const activeContainer = findContainer(id);
// const overContainer = findContainer(overId);

// if (
// !activeContainer ||
// !overContainer ||
// activeContainer === overContainer
// ) {
// return;
// }

// setItems((prev) => {
// const activeItems = prev[activeContainer];
// const overItems = prev[overContainer];

// // Find the indexes for the items
// const activeIndex = activeItems.indexOf(id);
// const overIndex = overItems.indexOf(overId);

// let newIndex;
// if (overId in prev) {
// // We're at the root droppable of a container
// newIndex = overItems.length + 1;
// } else {
// // Ensure that `over.rect` is available
// if (over.rect && draggingRect) {
// const isBelowLastItem =
// overIndex === overItems.length - 1 &&
// draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

// const modifier = isBelowLastItem ? 1 : 0;

// newIndex =
// overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
// } else {
// newIndex = overItems.length + 1;
// }
// }

// return {
// ...prev,
// [activeContainer]: [
// ...prev[activeContainer].filter((item) => item !== id),
// ],
// [overContainer]: [
// ...prev[overContainer].slice(0, newIndex),
// activeItems[activeIndex],
// ...prev[overContainer].slice(newIndex, prev[overContainer].length),
// ],
// };
// });
// }

// function handleDragOver(event) {
// const { active, over } = event;

// if (!over) {
// console.log("No column hovered over.");
// return; // No container is being hovered over
// }

// const activeTaskId = active.id;
// const overContainer = over.id; // This should be the column ID
// const activeContainer = findContainer(activeTaskId); // Find the column where the task is currently

// console.log("Active Task ID:", activeTaskId);
// console.log("Active Container ID:", activeContainer);
// console.log("Over Container ID:", overContainer);

// if (
// !activeContainer ||
// !overContainer ||
// activeContainer === overContainer
// ) {
// return;
// }

// // Move the task to the new container
// setItems((prev) => {
// const activeTasks = prev[activeContainer];
// const overTasks = prev[overContainer];

// return {
// ...prev,
// [activeContainer]: activeTasks.filter((id) => id !== activeTaskId), // Remove from active container
// [overContainer]: [...overTasks, activeTaskId], // Add to the new container
// };
// });
// // const { active, over } = event;
// // const activeTaskId = active.id;

// // if (!over) return; // No container is being hovered over

// // const overContainer = over.id; // This is the column ID
// // const activeContainer = findContainer(activeTaskId); // Find the column where the task is currently

// // if (
// // !activeContainer ||
// // !overContainer ||
// // activeContainer === overContainer
// // ) {
// // return;
// // }

// // // Move the task to the new container
// // setItems((prev) => {
// // const activeTasks = prev[activeContainer];
// // const overTasks = prev[overContainer];

// // return {
// // ...prev,
// // [activeContainer]: activeTasks.filter((id) => id !== activeTaskId), // Remove from active container
// // [overContainer]: [...overTasks, activeTaskId], // Add to the new container
// // };
// // });
// }
// function handleDragOver(event) {
// // console.log("printing the event from handleDragOver", event);
// // console.log("printing the over from the handleDragOver", event.over);
// // console.log("printing the acitve from the handleDragOver", event.active);
// const { active, over } = event;
// // ==================this is the task id that is being dragged=========================
// const activeTaskId = active.id;
// if (!over) {
// return;
// }
// // const overContainer = over.id;
// // Get the container ID from over.data.current
// const overContainer = over.data.current?.sortable?.containerId;
// // console.log("printig the over container Id", overContainer);
// console.log("printing the active task id", activeTaskId);

// const activeContainer = findContainer(activeTaskId);
// console.log("printing the active container", activeContainer);
// if (
// !activeContainer ||
// !overContainer ||
// activeContainer === overContainer
// ) {
// return;
// }

// // Move the task to the new container
// setItems((prev) => {
// const activeTasks = prev[activeContainer];
// const overTasks = prev[overContainer];

// return {
// ...prev,
// [activeContainer]: activeTasks.filter((id) => id !== activeTaskId), // Remove from active container
// [overContainer]: [...overTasks, activeTaskId], // Add to the new container
// };
// });
// }

    // Check which column contains the task
    // return Object.keys(items).find((columnId) =>
    //   items[columnId].includes(taskId)
    // );
    // const foundContainer = Object.keys(items).find((columnId) =>
    //   items[columnId].includes(taskId)
    // );
    // return foundContainer;



    // const overContainer = over.id;
    // const activeContainer = findContainer(activeTaskId);

    console.log("over id from the handleDrag end", over);

    console.log("Active Container:", activeContainer);
      console.log("Over Container:", overContainer);
      console.log("Active Tasks:", activeTasks);
      console.log("Over Tasks:", overTasks);


       // function handleDragEnd(event) {

// const { active, over } = event;

// // ==========================id of the dragged task=========================
// const { id } = active;
// // ================================id of the droppable column=============================
// const { id: overId } = over;
// console.log("Active id:", id);
// console.log("Over id:", overId);

// const activeContainer = findContainer(id);
// const overContainer = findContainer(overId);
// console.log("Active container:", activeContainer);

// if (!activeContainer || !overContainer) {
// return;
// }

// if (activeContainer === overContainer) {
// // ======================Task has been moved to a different column==========================
// const activeIndex = items[activeContainer].indexOf(id);
// const task = items[activeContainer][activeIndex];
// // ==========================Update the frontend state (rearrange tasks)===========================
// setItems((prevItems) => ({
// ...prevItems,
// [activeContainer]: prevItems[activeContainer].filter(
// (item) => item !== id
// ),
// [overContainer]: [...prevItems[overContainer], task],
// }));
// // Get the new status based on the new column
// const newStatus = getStatusByColumnId(overContainer);
// // Call the function to update the task status in the backend
// dispatch(updateTask(task.\_id, newStatus));

// setActiveId(null);
// } else {
// const activeIndex = items[activeContainer].indexOf(active.id);
// const overIndex = items[overContainer].indexOf(overId);

// if (activeIndex !== overIndex) {
// setItems((items) => ({
// ...items,
// [overContainer]: arrayMove(
// items[overContainer],
// activeIndex,
// overIndex
// ),
// }));
// }

// setActiveId(null);
// }
// }

// Dispatch update for task status based on the new column

    // dispatch(
    //   changeTaskStatus(activeTaskId, getStatusByColumnId(overContainer))
    // );

      // function handleDragEnd(event) {

// // const { active, over } = event;
// // const activeTaskId = active.id;
// // if (!over) {
// // console.log("No 'over' object found. Exiting.");
// // return;
// // }

// // const overContainer = over.data.current?.sortable?.containerId;
// // const activeContainer = findContainer(activeTaskId);

// // console.log("Active container:", activeContainer);
// // console.log("Over container:", overContainer);

// // const status = getStatusByColumnId(overContainer);
// // console.log("Status from getStatusByColumnId:", status);

// // if (!activeContainer || !overContainer) {
// // console.log("Active or Over container is missing. Exiting.");
// // return;
// // }

// // Check if any of these conditions are true
// // if (
// // !activeContainer ||
// // !overContainer ||
// // activeContainer === overContainer
// // ) {
// // console.log("Condition met. Exiting.");
// // return;
// // }

// // if (!over) {
// // return;
// // }
// // const overContainer = over.data.current?.sortable?.containerId;
// // const activeContainer = findContainer(activeTaskId);
// // const status = getStatusByColumnId(overContainer);
// // if (status === null) {
// // return;
// // }
// // console.log("printing status from handleDragEnd", status);

// // if (
// // !activeContainer ||
// // !overContainer ||
// // activeContainer === overContainer
// // ) {
// // return;
// // }
// // console.log("printing activeTaskId from handleDragEnd", activeTaskId);

// // setItems((prev) => {
// // const activeTasks = prev[activeContainer] || [];
// // const overTasks = prev[overContainer] || [];

// // return {
// // ...prev,
// // [activeContainer]: activeTasks.filter((id) => id !== activeTaskId),
// // [overContainer]: [...overTasks, activeTaskId],
// // };
// // });
// // setActiveId(null);
// }
