import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../reducers/notificationReducer";

export const Notification = () => {
  const alert = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(hideAlert());
  }, 7000);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    position: "absolute",
    top: "40%",
    left: "40%",
    zIndex: 2,
    minWidth: "80px",
    backgroundColor: "white",
  };

  return <>{alert.length > 0 ? <div style={style}>{alert}</div> : ""}</>;
};
