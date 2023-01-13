import { useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification} from "../reducers/notificationReducer"

export const Vote = (id) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVotes(id));
    dispatch(setNotification('You voted!', 7000))
  };

  return (
    <>
      <button onClick={() => vote(id)}>Vote</button>
    </>
  );
};
