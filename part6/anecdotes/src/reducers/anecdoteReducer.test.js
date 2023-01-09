import deepFreeze from "deep-freeze";
import reducer, { initialState } from "./anecdoteReducer";

describe("anecdote reducer", () => {
  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = reducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("returns new state with action add new", () => {
    const state = [];
    const action = {
      type: "anecdotes/addNew",
      payload:
        "the app state is in redux store",
    };

    deepFreeze(state);

    const newState = reducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState.map(s => s.data.content)).toContain(action.payload)
  });

  test("can vote on existing blog", () => {
    const state = [
      { content: "something old", id: 1, votes: 0 },
      { content: "something borrowed", id: 2, votes: 0 },
      { content: "something blue", id: 3, votes: 0 },
    ];
    const action = {
      type: "anecdotes/incrementVotes",
      payload: { id: 3 },
    };

    deepFreeze(state);
    const newState = reducer(state, action);
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(state[0])


    expect(newState).toEqual([
      { content: "something blue", id: 3, votes: 1 },
      { content: "something old", id: 1, votes: 0 },
      { content: "something borrowed", id: 2, votes: 0 },
    ]);
  });
});
