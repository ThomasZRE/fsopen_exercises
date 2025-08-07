/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
import { useState } from "react"

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      buton press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = (props) => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )


const App = () => {
  const [ value, setValue ] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  
  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='Thousand'/>
      <Button onClick={() => setToValue(0)} text='Zero'/>
      <Button onClick={() => setToValue(value + 1)} text='Increment'/>
    </div>
  )
} 

export default App