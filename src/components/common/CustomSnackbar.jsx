import { Alert, Snackbar } from "@mui/material";

const CustomSnackBar = ({ open, onClose, success, message }) => {
  
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}  anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
      <Alert
        onClose={onClose}
        severity={success ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%",bgcolor: success ? "#7CC25B" : "#FF8B8B"}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;