
export const Add = ({ handleSubmit, handleChange, newName }) => {

    return (
        <>
            <form action="submit" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Name" value={newName.name} onChange={(e) => handleChange(e)} />
                <button type="submit">Add</button>
            </form>
        </>
    )

}