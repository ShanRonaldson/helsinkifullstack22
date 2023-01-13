import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewNote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`${content} added!`, 7000));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewNote}>
        <div>
          <label htmlFor="content">Anecdote content: </label>
          <input type="text" name="content" id="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
