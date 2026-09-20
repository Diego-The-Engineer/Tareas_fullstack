import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({name, number, id, delPerson}) => {
  return (
    <>
    <p>{name} {number} <button onClick={() => delPerson(id)}> Delete </button></p>
    </>
  )
}

const Persons = ({showPerson, delPerson}) => {
  return (
    <>
        {showPerson.map(person => 
          <Person 
            key={person.id}
            name={person.name}
            number={person.number}
            id={person.id}
            delPerson={delPerson}
          />
        )}
      </>
  )
}

const App = () => {
  useEffect(()=> {
  personService
    .getAll()
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


  const showPerson = search.toLowerCase() ? persons.filter(person => person.name?.toLowerCase().includes(search.toLowerCase())) : persons  

  const modPerson = (existingPerson, id) => {
    alert( existingPerson.name + ' already exists, wanna update number?')
    const newObject = {...existingPerson, number: newNumber}
     personService
    .modify(existingPerson.id, newObject)
    .then(response =>{
      setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person))
      setNewName('')
      setNewNumber('')
    })
  }

  const addPerson= (event) => {
  event.preventDefault()
  if(newName === "" || newNumber ==="") return
  const existingPerson = persons.find(person => person.name === newName)
  if(existingPerson){
    modPerson(existingPerson, existingPerson.id)
  }else{
    const personObject = {
    name: newName,
    number: newNumber,
    id: String(persons.length + 1)
  }
  personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

}

  const delPerson = (id) => {
    const res = persons.findIndex(person => person.id === id)
    const neim = persons[res].name
    alert('Delete ' + neim + '?')
    personService
    .deletE(id)
    .then(() => 
      setPersons(persons.filter(person => person.id !== id))
    )
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

      <Persons showPerson={showPerson} delPerson={delPerson}/>

    </>
  )
}

export default App