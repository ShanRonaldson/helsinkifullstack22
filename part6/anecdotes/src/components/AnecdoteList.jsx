import { useSelector } from "react-redux";
import { Vote } from "./Vote";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  console.log(anecdotes)
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} {anecdote.votes === 1 ? `vote` : `votes`}
          </div>
          <Vote id={anecdote.id} />
        </div>
      ))}
    </>
  );
};
