import { createReducer } from "@reduxjs/toolkit";
import {
    CLEAR_TASK_ERRORS,
  CREATE_TASK,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
} from "../contants/task-contants";

const initialState = {
  loading: false,
  message: "",
  error: "",
};

const taskReducer = createReducer(initialState, (builder) => {
  builder.addCase(CREATE_TASK, (state) => {
    state.loading = true;
  });
  builder.addCase(CREATE_TASK_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase(CREATE_TASK_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(UPDATE_TASK, (state) => {
    state.loading = true;
  });
  builder.addCase(UPDATE_TASK_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase(UPDATE_TASK_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase(DELETE_TASK, (state) => {
    state.loading = true;
  });
  builder.addCase(DELETE_TASK_SUCCESS, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  builder.addCase(DELETE_TASK_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(CLEAR_TASK_ERRORS, (state) => {
    state.error = "";
    state.message = "";
  });
});

export default taskReducer;
