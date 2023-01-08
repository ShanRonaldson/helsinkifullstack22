import deepFreeze from "deep-freeze";
import { initialState, reducer } from "./anecdoteReducer";

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
      type: "ADD_NEW",
      data: {
        content: "the app state is in redux store",
        id: 1,
        votes: 1,
      },
    };

    deepFreeze(state);

    const newState = reducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });

  test("can vote on existing blog", () => {
    const state = [
      { content: "something old", id: 1, votes: 0 },
      { content: "something borrowed", id: 2, votes: 0 },
      { content: "something blue", id: 3, votes: 0 },
    ];
    const action = {
      type: "VOTE",
      data: { id: 3 },
    };

    deepFreeze(state);
    const newState = reducer(state, action);
    expect(newState).toEqual([
      { content: "something old", id: 1, votes: 0 },
      { content: "something borrowed", id: 2, votes: 0 },
      { content: "something blue", id: 3, votes: 1 },
    ]);
  });
});
