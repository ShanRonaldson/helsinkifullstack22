import { useParams } from "react-router-dom";

export const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((n) => n.id === Number(id));
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>

      <p>
        has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
      </p>

      <p>
        for more info visit{" "}
        <a target="_blank" rel="noreferrer" href={anecdote.info}>
          {anecdote.info}
        </a>
      </p>
    </div>
  );
};
