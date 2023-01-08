import { useDispatch } from "react-redux";
import { increment } from "../reducer";

export const Vote = () => {
  const dispatch = useDispatch();

  const good = () => {
    dispatch(increment("good"));
  };

  const ok = () => {
    dispatch(increment("ok"));
  };

  const bad = () => {
    dispatch(increment("bad"));
  };

  const reset = () => {
    dispatch(increment("zero"));
  };

  return (
    <>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
    </>
  );
};
