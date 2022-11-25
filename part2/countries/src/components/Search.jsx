export const Search = ({ handleChange }) => {
  return (
    <>
      <label htmlFor="search">find countries</label>
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};
