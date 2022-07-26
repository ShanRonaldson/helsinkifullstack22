import { useState } from 'react';
import { Add } from './components/Add';
import { Header } from './components/Header'
import { List } from './components/List';
import { Search } from './components/Search';

export const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 123 123' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState({ name: '', number: '' });

  const [search, setSearch] = useState({ name: '' });

  const [filteredPersons, setFilteredPersons] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    persons.map(person => {
      if (newName.name === person.name) {
        alert(`${newName.name} is already added to the phonebook`);
        return true;
      } else {
        setPersons(persons.concat(newName));
      }
    });
    setNewName({ name: '', number: '' })
  }

  const handleChange = (event) => {
    setNewName({ ...newName, [event.target.id]: event.target.value })
  }

  const handleSearch = (event) => {
    setSearch({ name: event.target.value.toLowerCase() })

    const personsArr = persons.filter(person => {
      return person.name.toLowerCase().match(new RegExp(search.name, 'g'))
    })

    setFilteredPersons(personsArr)

  }

  return (
    <>
      <Header text={'Phonebook'} />

      <Add newName={newName} handleSubmit={handleSubmit} handleChange={handleChange} />

      <Search handleSearch={handleSearch} filter={filteredPersons} />

      <List persons={persons} />
    </>
  )
}

export default App;
