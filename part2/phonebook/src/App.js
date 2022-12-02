import { useEffect, useState } from 'react';
import { getAll, create, update, remove } from './services/server';
import { Add } from './components/Add';
import { Header } from './components/Header'
import { List } from './components/List';
import { Search } from './components/Search';

export const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAll().then(data => {
      setPersons(data)
    })
  }, [])

  const [newName, setNewName] = useState({ name: '', number: '' });

  const [search, setSearch] = useState({ name: '' });

  const [filteredPersons, setFilteredPersons] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const search = persons.some(person => person.name.toLowerCase() === newName.name.toLowerCase())

    if (search) {
      const toChange = persons.filter(person => person.name.toLowerCase() === newName.name.toLowerCase())
      if (window.confirm(`${newName.name} is already in the database. Do you want to change their number?`)) {
        update(toChange[0].id, newName)
        getAll().then(data => {
          setPersons(data)
        });
      }
    } else if (!search) {
      create(newName).then(data => { setPersons(persons.concat(data)); })
    }

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

  const handleDelete = (id) => {
    const toDelete = persons.filter((person) => person.id === id)

    if (window.confirm(`Are you sure you want to delete ${toDelete[0].name} ?`)) {
      remove(id);
      getAll().then(data => {
        setPersons(data)
      });
    }
  }


  return (
    <>
      <Header text={'Phonebook'} />

      <Add newName={newName} handleSubmit={handleSubmit} handleChange={handleChange} />

      <Search handleSearch={handleSearch} filter={filteredPersons} />

      <List persons={persons} handleDelete={handleDelete} />
    </>
  )
}

export default App;
