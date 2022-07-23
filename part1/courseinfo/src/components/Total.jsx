export const Total = (props) => {

    const total = props.part1.exercises + props.part2.exercises + props.part3.exercises;

    return (
        <p>
            Number of exercises {total}
        </p>
    )
}