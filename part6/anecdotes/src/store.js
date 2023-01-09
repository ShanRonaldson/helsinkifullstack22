import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers/anecdoteReducer";
import App from "./App";


const store = configureStore({ reducer: { anecdotes: reducer } })

export const AnecdotesApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
