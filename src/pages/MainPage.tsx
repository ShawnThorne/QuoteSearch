import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import './MainPage.css'
import { SearchBar } from '../components/SearchBar'

export function MainPage() {
  interface Quote {
    id: string
    author: string
    content: string
  }

  const [randomQuote, setRandomQuote] = useState<Quote | null>(null)

  async function getRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote: Quote = await result.json();
    setRandomQuote(quote);
  } 

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <div className="App">
      <h1>Quotes Search</h1>
      <SearchBar/>
      <h3>"{randomQuote?.content}"</h3>
      <h3>-{randomQuote?.author}</h3>

    </div>
  )
}
