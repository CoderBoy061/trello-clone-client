import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/actions/task-actions";
import { Button } from "@mui/material";
import DetailsModal from "../common/DetailsModal";
import { formatISODate } from "../../data";
import CreateTaskModal from "../common/CreateTaskModal";

const TaskCard = ({ task }) => {
  const style = {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
    padding: "20px",
    background: "#e0f7fa",
  };
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Prevent button clicks from triggering drag
  const handleClick = (e) => {
    e.preventDefault(); // Prevent click from bubbling to parent
  };

  return (
    <>
      <div style={style} className="task-card">
        <h3>{task?.title}</h3>
        <p className="desc">{task?.description}</p>
        <p>Created at: {formatISODate(task?.createdAt)}</p>
        <div className="action-button">
          <Button
            sx={{ backgroundColor: "red", color: "white" }}
            onClick={(e) => {
              handleClick(e);
              dispatch(deleteTask(task._id));
            }}
          >
            Delete
          </Button>
          <Button
            sx={{ backgroundColor: "#2196f3", color: "white", opacity: "0.7" }}
            onClick={(e) => {
              handleClick(e);
              setShowEditModal(!showEditModal);
            }}
          >
            Edit
          </Button>
          <Button
            sx={{ backgroundColor: "#2196f3", color: "white" }}
            onClick={(e) => {
              handleClick(e);
              setShowModal(!showModal);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
      {showModal && (
        <DetailsModal
          open={showModal}
          close={() => setShowModal(false)}
          task={task}
        />
      )}
      {
        // EditModal goes here
        showEditModal && (
          <CreateTaskModal
            open={showEditModal}
            close={() => setShowEditModal(false)}
            task={task}
          />
        )
      }
    </>
  );
};

export default TaskCard;
