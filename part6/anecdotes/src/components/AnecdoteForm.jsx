import { useDispatch } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(addNew(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <label htmlFor="content">Anecdote content: </label>
          <input type="text" name="content" id="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};