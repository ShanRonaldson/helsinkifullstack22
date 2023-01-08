import { useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";

export const Vote = (id) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVotes(id));
  };

  return (
    <>
      <button onClick={() => vote(id)}>Vote</button>
    </>
  );
};
