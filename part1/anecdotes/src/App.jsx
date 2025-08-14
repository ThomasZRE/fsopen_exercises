import { useState } from "react"

const MostVotes = (props) => {
  const mostVotes = Math.max(...props.votes)
  const winner = props.votes.indexOf(mostVotes)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[winner]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

const App = () => {
  [].indexOf
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const selectAnect = () => {
    const getRandInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)

      return Math.floor(Math.random() * (max - min) + min)
    }
    
    setSelected(getRandInt(0, anecdotes.length))
  }

  

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const votesCopy = [...votes]
  
  const handleVotes = (value) => () => {
    votesCopy[value] += 1
    setVotes(votesCopy)
  }
  

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes(selected)}>
        vote
      </button>
      <button onClick={selectAnect}>next anecdote</button>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
