import { SyntheticEvent, useEffect, useState } from 'react';
import './MainPage.css';
import {Quote} from '../components/QuoteInterface';

export function MainPage() {

  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [quoteList, setQuoteList] = useState<Quote[] | null>(null);
  const [searchedAuthor, setSearchedAuthor] = useState('');

  async function getRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote: Quote = await result.json();
    setRandomQuote(quote);
    setQuoteList(null)
  } ;

  useEffect(() => {
    getRandomQuote();
  }, []);

   async function searchAuthor(e: SyntheticEvent){
    e.preventDefault();
    const call = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchedAuthor}`);
    const quoteList = await call.json();
    setQuoteList(quoteList.results);
    setRandomQuote(null);
    window.scrollTo(0,0);
  };

  return (
    <div className="App">
      <div id={randomQuote !== null ? "mainBodyNoSearch" : "mainBodySearch"}>
        <div id='header'>
          <h1 onClick={getRandomQuote}>Quotes Search</h1>
          <div id="searchBar">
              <form id='searchForm' onSubmit={searchAuthor}>
                <button><span className="material-symbols-outlined">search</span></button>
                <input type="text" onChange={e => setSearchedAuthor(e.target.value)}/>
              </form>
          </div>
        </div>
        {randomQuote !== null && quoteList === null &&
        <div>
          <h2>"{randomQuote?.content}"</h2>
          <h3 id='homeAuthor'>-{randomQuote?.author}</h3>
        </div>
        }
        {quoteList !== null &&
          <div id='quotesDiv'>
          {
          quoteList.map((quote) => (
              <div className="quote">
                <span>"{quote.content}"</span>
                <br />
                <span>-{quote.author}</span>
              </div>
            ))
            }
        </div>
        }
      </div>
    </div>
  );
}
