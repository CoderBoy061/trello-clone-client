import { Box, Button, Modal } from "@mui/material";
import React from "react";
import "../../App.css";

const DetailsModal = ({open, close,task}) => {
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
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 600 }}>
        <h2 id="parent-modal-title">{task?.title}</h2>
        <p className="desc">{task?.description}</p>
        <p className="createdAt">Created at: {task?.createdAt}</p>
        <Button onClick={close} variant="contained" >Close</Button>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
