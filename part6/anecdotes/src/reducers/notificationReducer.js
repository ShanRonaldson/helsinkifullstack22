import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifyReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notify(state, action) {
      const content = action.payload;
      console.log("notification content ", content);
      state = content;
      return state;
    },
    hideAlert(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const { notify, hideAlert } = notifyReducer.actions;
export default notifyReducer.reducer;
