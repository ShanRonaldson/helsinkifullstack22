import { Link } from "react-router-dom";

export const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div className="router-menu">
      <Link style={padding} to="/">
        about
      </Link>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
    </div>
  );
};
