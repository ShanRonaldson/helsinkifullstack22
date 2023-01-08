import { useSelector } from "react-redux";

export const View = () => {
  const votes = useSelector((state) => state);
  
  return (
    <>
      <div>good {votes.good}</div>
      <div>ok {votes.ok}</div>
      <div>bad {votes.bad}</div>
    </>
  );
};
