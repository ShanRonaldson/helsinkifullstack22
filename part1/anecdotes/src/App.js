import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";

export const App = () => {

  const [quoteAndVotes, setQuotesAndVotes] = useState([]);
  const [displayQuote, setDisplayQuote] = useState({ anecdote: 'first', likes: 0 })
  const [random, setRandom] = useState(0)

  useEffect(() => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ];

    const array = [];
    anecdotes.forEach((anecdote, index) => array.push({ index: index, anecdote: anecdote, likes: 0 }))

    setQuotesAndVotes(array);
  }, [])


  const generateRandom = (min, max) => {
    return Math.floor(Math.random() * max + min);
  }

  const handleStart = () => {
    let number = generateRandom(0, quoteAndVotes.length);
    setRandom(number)
    setDisplayQuote({ anecdote: quoteAndVotes[number].anecdote, likes: quoteAndVotes[number].likes })
  }

  const handleClick = () => {
    let number = generateRandom(0, quoteAndVotes.length);
    setRandom(number);
    setDisplayQuote({ anecdote: quoteAndVotes[number].anecdote, likes: quoteAndVotes[number].likes })
  }

  const handleVote = () => {
    setQuotesAndVotes({ [random]: { likes: quoteAndVotes[random].likes + 1 } })


  }

  if (displayQuote.anecdote !== 'first') {
    return (
      <div>
        <p>
          {displayQuote.anecdote}
        </p>
        <Button text={'See another'} handleClick={() => handleClick()} />

        <Button text={'vote'} handleClick={() => handleVote()} />

        <p>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>
          Press to see a quote!
        </h1>
        <Button text={'Show me a quote'} handleClick={() => handleStart()} />
      </div>
    )
  }



}