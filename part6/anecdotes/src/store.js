import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import App from "./App";
import { Notification } from "./components/Notification";

export const AnecdotesApp = () => {
  const store = configureStore({
    reducer: { anecdotes: anecdoteReducer, notifications: notificationReducer },
  });

  return (
    <Provider store={store}>
      <Notification />
      <App />
    </Provider>
  );
};
