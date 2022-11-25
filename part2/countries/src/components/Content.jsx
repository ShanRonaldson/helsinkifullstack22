export const Content = ({ countries }) => {
  if (countries !== null) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length <= 10 && countries.length > 1) {
      return (
        <ul>
          {countries.map((country, key) => (
            <li key={key}>{country.name.common}</li>
          ))}
        </ul>
      );
    } else {
      const country = countries;
      let languages = {};
      country.map((lang) => (languages = lang.languages));

      return (
        <div>
          {country.map((info, key) => {
            return (
              <div key={key}>
                <h2>{info.name.common} </h2>
                <h4>Capital: </h4> <p>{info.capital}</p>
                <h4> Area (sq km): </h4> <p>{info.area}</p>
                <h4> Population: </h4> <p>{info.population}</p>
                <h4> Location: </h4>{" "}
                <p>
                  {info.region}, {info.subregion}
                </p>
                <h4>Languages: </h4>
                <ul>
                  {Object.entries(languages).map((lang, key) => (
                    <li key={key}>{`${lang[1]}`}</li>
                  ))}
                </ul>
                <img className="flag-image" src={info.flags.svg} alt={info.name.common + `'s flag`} />
              </div>
            );
          })}
        </div>
      );
    }
  } else {
    return <p>please search something</p>;
  }
};
