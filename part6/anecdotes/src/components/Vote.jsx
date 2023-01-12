import { useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import {notify} from "../reducers/notificationReducer"

export const Vote = (id) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVotes(id));
    dispatch(notify('You voted!'))
  };

  return (
    <>
      <button onClick={() => vote(id)}>Vote</button>
    </>
  );
};
