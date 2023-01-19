import { useDispatch } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const Vote = (id, name) => {
  const dispatch = useDispatch();
console.log(name)
  const vote = (id) => {
    dispatch(incrementVotes(id));
    dispatch(setNotification("You voted!", 7000));
    console.log("name", name);
  };

  return (
    <>
      <button onClick={() => vote(id)}>Vote</button>
    </>
  );
};
