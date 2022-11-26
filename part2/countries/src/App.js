import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios';
import { Search } from "./components/Search"
import { Content } from "./components/Content";

export const App = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showCountry, setShowCountry] = useState(false);
    const [countryToShow, setCountryToShow] = useState([]);

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

    const handleShow = (country) => {
        if (showCountry) {
            setShowCountry(false);
            setCountryToShow([])
        } else {
            setShowCountry(true);
            setCountryToShow(country)
        }
    }


    return (
        <>
            <Search handleChange={handleChange} />
            <Content countries={filteredCountries} handleShow={handleShow} showCountry={showCountry} countryToShow={countryToShow} />
        </>
    )
}
