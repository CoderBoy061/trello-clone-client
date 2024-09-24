import { createReducer } from "@reduxjs/toolkit";
import {
  CLEAR_ERROR,
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
} from "../contants/user-contants.js";

const initialState = {
  user: [],
  isAuthenticated: false,
  loading: false,
  islogin: false,
  error: null,
  message: null,
  userColumn : []
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(EMAIL_REGISTER, (state, _) => {
    state.islogin = true;
  });
  builder.addCase(EMAIL_REGISTER_SUCCESS, (state, action) => {
    (state.islogin = false), (state.message = action.payload);
  });
  builder.addCase(EMAIL_REGISTER_FAILURE, (state, action) => {
    (state.islogin = false), (state.error = action.payload);
  });

  builder.addCase(GET_USER, (state, _) => {
    state.loading = true;
  });
  builder.addCase(GET_USER_SUCCESS, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  });
  builder.addCase(GET_USER_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  });
  builder.addCase(EMAIL_SIGN_IN, (state, _) => {
    state.islogin = true;
  });
  builder.addCase(EMAIL_SIGN_IN_SUCCESS, (state, action) => {
    state.islogin = false;
    state.message = action.payload;
  });
  builder.addCase(EMAIL_SIGN_IN_FAILURE, (state, action) => {
    state.islogin = false;
    state.error = action.payload;
  });

  builder.addCase(CLEAR_ERROR, (state, _) => {
    state.error = null;
    state.message = null;
  });

  builder.addCase(FETCH_USER_COLUMN, (state, _) => {
    state.loading = true;
  });
  builder.addCase(FETCH_USER_COLUMN_SUCCESS, (state, action) => {
    state.loading = false;
    state.userColumn = action.payload;
  });
  builder.addCase(FETCH_USER_COLUMN_FAILURE, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(GOOGLE_SIGN_IN, (state, _) => {
    state.islogin = true;
  })
  builder.addCase(GOOGLE_SIGN_IN_SUCCESS, (state, action) => {
    state.islogin = false;
    state.message = action.payload
  })
  builder.addCase(GOOGLE_SIGN_IN_FAILURE, (state, action) => {
    state.islogin = false;
    state.error = action.payload
  })

  builder.addCase(GOOGLE_REGISTER, (state, _) => {
    state.islogin = true;
  }) 
  builder.addCase(GOOGLE_REGISTER_SUCCESS, (state, action) => {
    state.islogin = false;
    state.message = action.payload
  })
  builder.addCase(GOOGLE_REGISTER_FAILURE, (state, action) => {
    state.islogin = false;
    state.error = action.payload
  })
});

export default userReducer;
