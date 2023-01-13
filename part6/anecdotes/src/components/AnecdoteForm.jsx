import { useDispatch } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import { create } from "../services/anecdotes";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewNote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    const newAnecdote = await create(content);
    dispatch(addNew(newAnecdote));
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
