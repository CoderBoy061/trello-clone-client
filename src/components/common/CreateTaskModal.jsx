import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Select, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { statusData } from "../../data";
import "./CreateTaskModal.css";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../../redux/actions/task-actions";

const CreateTaskModal = ({ open, close, task }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState( null);
  const dispatch = useDispatch();
  const createTaskhandler = () => {
    if (title === "" || description === "" || status === null) {
      alert("All fields are required");
      return;
    }
    dispatch(createTask(title, description, status));
  };
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      // Reset the form when no task is provided
      setTitle("");
      setDescription("");
      setStatus(null);
    }
  }, [task]);

  const updateTaskHandler = () => {
    if (title === "" || description === "" || status === null) {
      alert("All fields are required");
      return;
    }
    dispatch(updateTask(task._id, title, description, status));
    close();
  }

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <h3>Add New Task</h3>
        <div className="create-task-form">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            maxRows={4}
          />
          <FormControl sx={{}} size="small">
            <InputLabel id="demo-select-small-label">{ task? "":"Status"}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              value={status}
            >
              {statusData.map((item) => (
                <MenuItem key={item.title} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={task?updateTaskHandler:createTaskhandler}
          >
           { task ? "Update Task":"Add Task"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
