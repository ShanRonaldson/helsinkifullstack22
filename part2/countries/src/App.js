import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios';
import { Search } from "./components/Search"
import { Content } from "./components/Content";

export const App = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data))
    }, [])

    const handleChange = (e) => {
        const input = e.target.value;
        setSearch(input);
        setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(search)))
    }


    return (
        <>
            <Search handleChange={handleChange} />
            <Content countries={filteredCountries}/>
        </>
    )
}
