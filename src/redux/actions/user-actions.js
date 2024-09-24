import axios from "axios";
import {
  EMAIL_REGISTER,
  EMAIL_REGISTER_FAILURE,
  EMAIL_REGISTER_SUCCESS,
  EMAIL_SIGN_IN,
  EMAIL_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_SUCCESS,
  FETCH_USER_COLUMN,
  FETCH_USER_COLUMN_FAILURE,
  FETCH_USER_COLUMN_SUCCESS,
  GET_USER,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GOOGLE_REGISTER,
  GOOGLE_REGISTER_FAILURE,
  GOOGLE_REGISTER_SUCCESS,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_FAILURE,
  GOOGLE_SIGN_IN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from "../contants/user-contants.js";
import {
  createUserViaEmailPasswordUrl,
  getAllColumnsAndTasksUrl,
  getUserInfoUrl,
  loginUserViaEmailPasswordUrl,
  loginUserViaGoogleUrl,
  logoutUserUrl,
  registerUserViaGoogleUrl,
} from "../api";

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER,
    });
    const { data } = await axios.get(getUserInfoUrl, {
      credentials:"include",
      withCredentials: true,
    });

    if (data.success === true) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: "",
    });
  }
};
export const createUserViaEmailPassword =
  (fName, lName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: EMAIL_REGISTER,
      });

      const { data } = await axios.post(
        createUserViaEmailPasswordUrl,
        {
          fName,
          lName,
          email,
          password,
        },

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success === true) {
        dispatch(getUserInfo());
        dispatch({
          type: EMAIL_REGISTER_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: EMAIL_REGISTER_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: EMAIL_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginUserViaEmailPassword =
  (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: EMAIL_SIGN_IN,
      });
      const { data } = await axios.post(
        loginUserViaEmailPasswordUrl,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success === true) {
        dispatch(getUserInfo());
        dispatch({
          type: EMAIL_SIGN_IN_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: EMAIL_SIGN_IN_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: EMAIL_SIGN_IN_FAILURE,
        payload: error.response && error.response.data.message,
      });
    }
  };

export const registerUserViaGoogle = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GOOGLE_REGISTER,
    });
    const { data } = await axios.post(
      registerUserViaGoogleUrl,
      {
        code,
      },
      {
        withCredentials: true,
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success === true) {
      dispatch(getUserInfo());
      dispatch({
        type: GOOGLE_REGISTER_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: GOOGLE_REGISTER_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GOOGLE_REGISTER_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const loginUserViaGoogle = (code) => async (dispatch) => {
  try {
    dispatch({
      type: GOOGLE_SIGN_IN,
    });

    const { data } = await axios.post(
      loginUserViaGoogleUrl,
      {
        code,
      },
      {
        credentials:"include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success === true) {
      dispatch({
        type: GOOGLE_SIGN_IN_SUCCESS,
        payload: data.message,
      });
      dispatch(getUserInfo());
    } else {
      dispatch({
        type: GOOGLE_SIGN_IN_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GOOGLE_SIGN_IN_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
    const { data } = await axios.post(logoutUserUrl, null, {
      credentials:"include",
      withCredentials: true,
    });
    if (data.success === true) {
      window.location.href = "/";
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};

export const fetchUserColumns = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_COLUMN,
    });

    const { data } = await axios.get(getAllColumnsAndTasksUrl, {
      withCredentials: true,
    });

    if (data.success === true) {
      dispatch({
        type: FETCH_USER_COLUMN_SUCCESS,
        payload: data.columns,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_USER_COLUMN_FAILURE,
      payload: error.response && error.response.data.message,
    });
  }
};
