import { anecdotesAtStart } from "./data";
import { createSlice } from "@reduxjs/toolkit";

export const asObject = (anecdote) => {
  return {
    content: anecdote,
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
  initialState: [],
  reducers: {
    addNew(state, action) {
      const content = action.payload;
      state.push(content);
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
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addNew, incrementVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
