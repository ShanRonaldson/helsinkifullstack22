import { Country } from "./Country";

export const Content = ({
  countries,
  handleShow,
  showCountry,
  countryToShow,
}) => {
  if (countries != null && countries.length > 0) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length <= 10 && countries.length > 1) {
      return (
        <>
          {countries.map((country, key) => {
            return (
              <div key={key}>
                <p>
                  {country.name.common}{" "}
                  <button onClick={() => handleShow(country)}>Show</button>
                </p>
              </div>
            );
          })}
          {showCountry && (
            <div>
              <h2>{countryToShow.name.common}</h2>
              <h4>Capital: </h4> <p>{countryToShow.capital}</p>
              <h4>Area (sq km):</h4> <p>{countryToShow.area}</p>
              <h4>Population: </h4> <p>{countryToShow.population}</p>
              <h4>Location: </h4>{" "}
              <p>
                {countryToShow.region}, {countryToShow.subregion}
              </p>
              <h4>Languages: </h4>
              <ul>
                {Object.entries(countryToShow.languages).map((lang, key) => (
                  <li key={key}> {`${lang[1]}`} </li>
                ))}
              </ul>
              {/*               <h4>Languages: </h4> <p>{countryToShow.languages}</p>
               */}{" "}
              <img
                className="flag-image"
                src={countryToShow.flags.svg}
                alt={countryToShow.name.common + `'s flag`}
              />
            </div>
          )}
        </>
      );
    } else {
      const country = countries;
      return <Country country={country} />;
    }
  } else {
    return <p>please search something</p>;
  }
};
