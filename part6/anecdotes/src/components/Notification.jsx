import {  useSelector } from "react-redux";

export const Notification = () => {
  const alert = useSelector((state) => state.notifications);
  
  const style = {
    border: "solid",
    padding: 10,
    margin: 20,
    borderWidth: 1,
    position: "sticky",
    top: "40%",
    left: "20%",
    right: "20%",
    zIndex: 2,
    backgroundColor: "white",
  };

  return <>{alert.length > 0 ? <div style={style}>{alert}</div> : ""}</>;
};
