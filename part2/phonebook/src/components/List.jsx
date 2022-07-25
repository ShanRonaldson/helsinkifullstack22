import { Header } from "./Header"

export const List = ({ persons }) => {

    return (
        <>
            <Header text={'People'} />

            <ul>
                {persons.map(person => (
                    <li key={person.name}>{person.name}</li>
                ))}
            </ul>
        </>
    )
}