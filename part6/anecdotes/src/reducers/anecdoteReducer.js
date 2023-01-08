import { anecdotesAtStart } from "./data";
const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

export const incrementVotes = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

export const addNew = (content) => {
  return {
    type: "ADD_NEW",
    data: asObject(content),
  };
};

const sorted = (a, b) => {
  let votesA = a.votes;
  let votesB = b.votes;

  return votesB - votesA;
};

export const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      console.log(id);
      const toChange = state.find((n) => n.id === id);
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };
      return state.map((val) => (val.id === id ? changed : val)).sort(sorted);
    }
    case "ADD_NEW":
      return [...state, action.data];
    default:
      return state;
  }
};
