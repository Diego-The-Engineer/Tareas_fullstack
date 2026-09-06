import { useState, useEffect } from 'react'
import axios from 'axios'

const Persona = ({text,value, onChange}) => {
  return (
    <>
    <p> {text} <input value={value} onChange={onChange}/></p>
    </>
  )
}

const PersonForm = ({onSubmit, newName, handleNoteChange, newNumber, handleNoteChange1}) => {
  return (
    <>
    <form onSubmit = {onSubmit}>
      <Persona text = "name: " value={newName} onChange={handleNoteChange}/>
      <Persona text = "number: " value={newNumber} onChange={handleNoteChange1}/>
      <button type="submit">add</button>
    </form>
    </>
  )
} 

const Filter = ({search, onChange}) => {
  return (
    <>
      filter shown with <input value={search} onChange={onChange}/>
    </>
  )
}

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Persons = ({showPerson}) => {
  return (
    <>
        {showPerson.map(person => 
          <Person 
            key={person.id}
            name={person.name}
            number={person.number}
          />
        )}
      </>
  )
}

const App = () => {
  useEffect(()=> {
  axios
  .get('http://localhost:3001/persons')
  .then(response => {
    setPersons(response.data)
  })
},[])




  const [persons, setPersons] = useState([]) 

  const [search, setShowAll] = useState('')

  const [newName, setNewName] = useState('')

  const[newNumber, setNewNumber] = useState('')

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

    const handleNoteChange1 = (event) => {
    setNewNumber(event.target.value)
  }

    const handleNoteChange2 = (event) => {
    setShowAll(event.target.value)
  }


  const showPerson = search.toLowerCase() ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) : persons  


  const addPerson= (event) => {
  event.preventDefault()
  if(newName === "" || newNumber ==="") return
  if(persons.some(person => person.name === newName) && persons.some(person => person.number === newNumber)) {
    alert (newName + ' is already added to phonebook')
    return
  }
  const personObject = {
    name: newName,
    number: newNumber,
    id: String(persons.length + 1),
  }
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')


}
  return (
    
    <>
      <h2>Phonebook</h2>

      <Filter search={search} onChange={handleNoteChange2}/>

      <h3>Add a new</h3>

      <PersonForm 
      onSubmit={addPerson}
      newName={newName}
      handleNoteChange={handleNoteChange}
      newNumber={newNumber}
      handleNoteChange1={handleNoteChange1}
      />

      <h2>Numbers</h2>

      <Persons showPerson={showPerson}/>

    </>
  )
}

export default App