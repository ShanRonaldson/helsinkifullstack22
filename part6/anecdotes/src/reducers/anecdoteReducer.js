import { anecdotesAtStart } from "./data";
import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

const sorted = (a, b) => {
  let votesA = a.votes;
  let votesB = b.votes;

  return votesB - votesA;
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addNew(state, action) {
      const content = action.payload;
      const data = asObject(content);
      state.push(data);
    },
    incrementVotes(state, action) {
      const id = action.payload.id;
      const toChange = state.find((n) => n.id === id);
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };
      return state.map((val) => (val.id === id ? changed : val)).sort(sorted);
    },
  },
});

export const { addNew, incrementVotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
