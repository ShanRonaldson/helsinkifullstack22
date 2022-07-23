import { Part } from "./Part"

export const Content = (props) => {

    console.log(props.parts)

    const parts = props.parts;

    return (
        <div>
            {parts.map(part => {
                return (
                    <Part name={part.name} exercises={part.exercises} />
                )
            })}
        </div>
    )
}