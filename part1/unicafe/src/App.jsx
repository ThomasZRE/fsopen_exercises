import { useState } from 'react'

const StatLine = (props) => {
  if (props.text === 'Positive') { 
    return (
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}%</td>
      </tr>
    )
  }
  
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Stats = (props) => {
  const suma = props.good + props.bad + props.neutral
  const avg = suma / 3
  const positive = props.good / suma
  
  if (suma === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatLine text="good" value={props.good} />
          <StatLine text="bad" value={props.neutral} />
          <StatLine text="neutral" value={props.bad} />
          <StatLine text="All" value={suma} />
          <StatLine text="Average" value={avg} />
          <StatLine text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
  const handleBad = () => {
    const newBad = bad + 1 
    setBad(newBad)
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Stats good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App