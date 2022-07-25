import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";
import { Header } from "./components/Header";

export const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const points = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  }

  const generateRandom = (min, max) => {
    return Math.floor(Math.random() * max + min);
  }
  const [number, setNumber] = useState(generateRandom(0, anecdotes.length));

  const [displayed, setDisplayed] = useState(anecdotes[number]);
  const [votes, setVotes] = useState(points);
  const [max, setMax] = useState({ votes: 0, quote: '' });

  const handleNext = () => {
    setNumber(generateRandom(0, anecdotes.length))
    setDisplayed(anecdotes[number]);
  }

  const handleVote = () => {

    setVotes({ ...votes, [number]: votes[number] + 1 })

    if (max.votes < 1) {
      setMax({ votes: 1, quote: anecdotes[number] })
    } else {
      const keys = Object.keys(points);

      for (let i = 0; i < keys.length; i++) {
        let value = votes[keys[i]];
        console.log(value)
        if (value > max.votes) { setMax({ votes: value, quote: anecdotes[keys[i]] }) }

      }
    }

  }



  if (max.votes > 0) {

    return (
      <div>
        <Header text={'Anecdote of the day'} />
        <p>
          {displayed}
        </p>
        <Button text={'See another'} handleClick={() => handleNext()} />

        <Button text={'vote'} handleClick={() => handleVote()} />

        <Header text={'Anecdote with the most votes'} />
        <q>
          {max.quote}
        </q>
        <p>
          has {max.votes} votes
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <Header text={'Anecdote of the day'} />
        <p>
          {displayed}
        </p>
        <Button text={'See another'} handleClick={() => handleNext()} />

        <Button text={'vote'} handleClick={() => handleVote()} />

        <Header text={'No votes yet'} />
      </div>
    )
  }




}