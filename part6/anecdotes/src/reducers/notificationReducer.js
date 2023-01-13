import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifyReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notify(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    hideAlert(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(notify(message));

    setTimeout(() => {
      dispatch(hideAlert());
    }, time);
  };
};

export const { notify, hideAlert } = notifyReducer.actions;
export default notifyReducer.reducer;
