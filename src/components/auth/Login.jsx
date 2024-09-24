import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import GoogleIcon from "@mui/icons-material/Google";
import { isValidEmail, isValidPassword } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { loginUserViaEmailPassword, loginUserViaGoogle } from "../../redux/actions/user-actions";
import { CircularProgress } from "@mui/material";
import CustomSnackBar from "../common/CustomSnackbar";
import { CLEAR_ERROR } from "../../redux/contants/user-contants";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    status: false,
    message: "",
    success: true,
  });
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);

  // Handler to update state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    if (signupData.email === "" || signupData.password === "") {
      setSnackbar({
        open: true,
        message: "All fields are required",
        success: false,
      });
    }

    if (!isValidEmail(signupData.email)) {
      setSnackbar({
        open: true,
        message: "Invalid Email",
        success: false,
      });
    }
    if (!isValidPassword(signupData.password)) {
      setSnackbar({
        open: true,
        message: "Invalid Password",
        success: false,
      });
    }
    dispatch(
      loginUserViaEmailPassword(
        signupData.email.trim(),
        signupData.password.trim()
      )
    );
  };

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        success: false,
      });
      dispatch({
        type: CLEAR_ERROR,
      });
    }
    if (message) {
      setSnackbar({
        open: true,
        message: message,
        success: true,
      });
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  }, [error, message, dispatch]);
// fucntion to handle the errors to show in snackbar while doing google login
const onErrorHandler = () => {
  setSnackbar({
    success: false,
    message: "Something went wrong",
    open: true,
  });
};
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async ({ code }) => {
      dispatch(loginUserViaGoogle(code));
    },
    flow: "auth-code",
    onError: onErrorHandler,
  });

  
  return (
    <div className="login-container">
      <CustomSnackBar
        open={snackbar.open}
        message={snackbar.message}
        success={snackbar.success}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      <h1>Login</h1>
      <form className="signup-form">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={signupData.email}
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={signupData.password}
          onChange={handleInputChange}
        />

        <button onClick={loginHandler} disabled={loading}>
          {loading ? <CircularProgress /> : "Login"}
        </button>
        <p>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </p>
        <button
          type="button"
          className="google-login"
          onClick={googleLoginHandler}
        >
          <GoogleIcon />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
