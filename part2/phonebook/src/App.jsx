import { useState, useEffect } from "react"
import axios from 'axios'
import personService from './services/persons'

const Persons = (props) => <p key={props.person.id}>{props.person.name} {props.person.number}</p> 


const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filtName} onChange={props.filter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.nameHandle} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.numHandle} /> 
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Error = ({ message }) => {
  const errorStyle = {
    color: 'red',
    border: 'solid',
    background: 'lightgrey',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '20px',
    marginBottom: '10px',
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>    
  )
}


const Success = ( {message} ) => {
  const successStyle = {
    color: 'green',
    border: 'solid',
    background: 'lightgrey',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '20px',
    marginBottom: '10px',
  }

  if (message === null) {
    return null
  }

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtName, setFiltName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)//'Succesful!')
  const [errorMessage, setErrorMessage] = useState(null)//'Error happend...')


  useEffect(() => {
    personService.getAll().then(people => {
      setPersons(people)
    })
  }, [])
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFiltName = (event) => {
    setFiltName(event.target.value)
  }



  const addPerson = (event) => {
    event.preventDefault()

    const arr = persons.filter((obj) => obj.name === newName)
    if (arr.length != 0) {
      replacePerson(persons.find(p => p.name === newName).id)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      
      personService.create(newPerson).then(people => {
        setPersons(persons.concat(people))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() =>{
          setSuccessMessage(null)
        }, 3000)
      })
    }
  }

  const deleteById = (id) => {
    const personToDelete = persons.find((p) => p.id == id)

    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
        personService.deleteId(id).then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`Deleted ${newPerson.name}`)
          setTimeout(() =>{
          setSuccessMessage(null)
        }, 3000)
        })
        .catch(error => {
          console.log('Error from Delete')
          setErrorMessage(`Infomation of ${personToDelete.name} has already been removed from server`)
        setTimeout(() =>{
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
        })
      }
    else {
      return
    }
  }

  const replacePerson = (id) => {
    if (!window.confirm(`${newName} is already added to the phone book, replace the old number with a new one?`)) {
      return
    } else {
      const person = persons.find((p) => p.id === id)
      const changedPerson = {...person, number: newNumber}

      personService.update(id, changedPerson).then((updatedPerson) => {
        setPersons(persons.map(p => p.id === id ? updatedPerson : p))
        setSuccessMessage(`Updated ${updatedPerson.name}`)
        setTimeout(() =>{
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
          console.log('Error from Update')
          setErrorMessage(`Infomation of ${changedPerson.name} has already been removed from server`)
          setTimeout(() =>{
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const peopleToShow = filtName === '' 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filtName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage}/>
      <Error message={errorMessage} />
      <Filter filtName={filtName} filter={handleFiltName}/>
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        nameHandle = {handleNameChange}
        newNumber={newNumber}
        numHandle={handleNumberChange}
      />
      <h3>Numbers</h3>
      {peopleToShow.map(person => {
        return (
          <div key={person.id}>
            <Persons person={person} />
            <button onClick={() => deleteById(person.id)}>delete</button>
          </div>
        )
      })}
    </div>
  )

}

export default App