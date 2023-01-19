import { anecdotesAtStart } from "./data";
import { createSlice } from "@reduxjs/toolkit";
import { create, getAll } from "../services/anecdotes";

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
    incrementVotes(state, action) {
      const id = action.payload;
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await create(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const voteAnecdote = (id) => {};

export const { addNew, incrementVotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
