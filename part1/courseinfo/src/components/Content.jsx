import { Part } from "./Part"

export const Content = (props) => {

    console.log(props.parts)

    const parts = props.parts;

    return (
        <div>
            {parts.map((part, index) => {
                return (
                    <Part key={index} name={part.name} exercises={part.exercises} />
                )
            })}
        </div>
    )
}