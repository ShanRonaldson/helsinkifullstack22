import { useDispatch, useSelector } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (id, content) => {
    dispatch(incrementVotes(id));
    dispatch(setNotification(`You voted for '${content}'`, 5000));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} {anecdote.votes === 1 ? `vote` : `votes`}
          </div>
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            Vote
          </button>
        </div>
      ))}
    </>
  );
};
