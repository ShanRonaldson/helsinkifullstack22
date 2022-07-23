export const Total = (props) => {

    const parts = props.parts;

    let total = 0;

    parts.map(part =>
        total += part.exercises
    )

    return (
        <p>
            Number of exercises {total}
        </p>
    )
}