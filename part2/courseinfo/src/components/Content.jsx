import { Part } from "./Part"

export const Content = ({parts}) => {

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