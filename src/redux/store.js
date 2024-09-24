import taskReducer from "./reducers/task-reducer";
import userReducer from "./reducers/user-reducer";
import { configureStore } from "@reduxjs/toolkit";
 const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
});

export default store;