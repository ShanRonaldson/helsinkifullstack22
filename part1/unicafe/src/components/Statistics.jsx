
export const Statistics = ({ statistics, header }) => {

    return (
        <table>
            <thead>
                <th>
                    {header}
                </th>
            </thead>
            <tbody>
                {Object.keys(statistics).map((stat) => {
                    return (
                        <tr key={stat}>
                            <td>{stat}</td>
                            <td>{statistics[stat]}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )

}