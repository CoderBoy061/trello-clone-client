import React, { useEffect } from "react";
import Input from "../common/Input";
import { useState } from "react";
import "./Form.css";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import CustomSnackBar from "../common/CustomSnackbar";
import { isValidEmail, isValidPassword } from "./validator";
import { useDispatch, useSelector } from "react-redux";
import { createUserViaEmailPassword, registerUserViaGoogle } from "../../redux/actions/user-actions";
import { CLEAR_ERROR } from "../../redux/contants/user-contants";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const registerHandler = (e) => {
    e.preventDefault();
    if (
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.firstName === "" ||
      signupData.lastName === "" ||
      signupData.confirmPassword === ""
    ) {
      return setSnackbar({
        open: true,
        message: "All fields are required",
        success: false,
      });
    }
    if (!isValidEmail(signupData.email)) {
      return setSnackbar({
        open: true,
        message: "Invalid Email",
        success: false,
      });
    }
    if (!isValidPassword(signupData.password)) {
      return setSnackbar({
        open: true,
        message: "Pasword must be atleast 8 characters long and contain a number and a special character, and capital letter",
        success: false,
      });
    }
    if (signupData.password !== signupData.confirmPassword) {
      return setSnackbar({
        open: true,
        message: "Passwords do not match",
        success: false,
      });
    }
    dispatch(createUserViaEmailPassword(signupData.firstName, signupData.lastName, signupData.email, signupData.password));
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
  const onErrorHandler = () => {
    setSnackbar({
      success: false,
      message: "Something went wrong",
      open: true,
    });
  };

  const googleRegisterHandler = useGoogleLogin({
    onSuccess: async ({ code }) => {
      dispatch(registerUserViaGoogle(code));
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
      <h1>Signup</h1>
      <form className="signup-form">
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={signupData.firstName}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={signupData.lastName}
          onChange={handleInputChange}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleInputChange}
        />
        <button onClick={registerHandler} disabled={loading}>Login</button>
        <p>
          Already have an account? <Link to={"/"}>Login</Link>
        </p>
        <button type="button" className="google-login" onClick={googleRegisterHandler}>
          <GoogleIcon />
          Signup with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
