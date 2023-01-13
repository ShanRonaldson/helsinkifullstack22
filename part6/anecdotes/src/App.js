import { AnecdoteList } from "./components/AnecdoteList";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAll } from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
