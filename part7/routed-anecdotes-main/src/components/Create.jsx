import { useNavigate } from "react-router-dom";
import { useField } from "./Hooks";

export const CreateNew = (props) => {
  const content = useField("");
  const author = useField("");
  const info = useField("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input type="text" name="content" {...content} />
        </div>
        <div>
          author:
          <input type="text" name="author" {...author} />
        </div>
        <div>
          url for more info:
          <input type="text" name="info" {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
