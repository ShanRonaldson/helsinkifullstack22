export const Total = (props) => {

    const total = props.exercise1 + props.exercise2 + props.exercise3;

    return (
        <p>
            Number of exercises {total}
        </p>
    )
}