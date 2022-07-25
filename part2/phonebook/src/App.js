import { useState } from 'react';
import { Add } from './components/Add';
import { Header } from './components/Header'
import { List } from './components/List';

export const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState({ name: '' })

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat(newName));
    setNewName({ name: '' })
  }

  const handleChange = (event) => {
    setNewName({ name: event.target.value })
  }

  return (
    <>
      <Header text={'Phonebook'} />

      <Add newName={newName} handleSubmit={handleSubmit} handleChange={handleChange} />

      <List persons={persons} />
    </>
  )
}

export default App;
