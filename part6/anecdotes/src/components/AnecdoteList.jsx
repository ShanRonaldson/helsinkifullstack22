import { useSelector } from "react-redux";
import { Vote } from "./Vote";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
          <Vote id={anecdote.id} />
        </div>
      ))}
    </>
  );
};
