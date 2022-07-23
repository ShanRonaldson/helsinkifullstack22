import { Part } from "./Part"

export const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} />
            <Part part={props.part2} />
            <Part part={props.part3} />
        </div>
    )
}