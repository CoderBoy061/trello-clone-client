import axios from "axios";
import {
  CREATE_TASK,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_STATUS_FAILURE,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from "../contants/task-contants";
import {
  changeTaskStatusUrl,
  createTaskUrl,
  deleteTaskUrl,
  updateTaskUrl,
} from "../api";
import { getUserInfo } from "./user-actions";

export const createTask = (title, description, status) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TASK,
    });

    const { data } = await axios.post(
      createTaskUrl,
      {
        title,
        description,
        status,
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
      window.location.reload();
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updateTask =
  (id, title, description, status) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TASK,
      });
      const { data } = await axios.patch(
        `${updateTaskUrl}/${id}`,
        {
          title,
          description,
          status,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success === true) {
        window.location.reload();
        dispatch({
          type: UPDATE_TASK_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_TASK_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TASK,
    });

    const { data } = await axios.delete(`${deleteTaskUrl}/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.success === true) {
      window.location.reload();
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const changeTaskStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TASK_STATUS,
    });
    const { data } = await axios.patch(
      `${changeTaskStatusUrl}`,
      {
        id,
        status,
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
      window.location.reload();
      dispatch({
        type: UPDATE_TASK_STATUS_SUCCESS,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_STATUS_FAILURE,
      payload: error.response.data.message,
    });
  }
};
