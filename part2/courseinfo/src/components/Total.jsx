export const Total = ({ parts }) => {

    const total = parts.reduce((previous, current) =>
        ({ exercises: previous.exercises + current.exercises })
    )

    return (
        <strong>
            Number of exercises {total.exercises}
        </strong>
    )
}