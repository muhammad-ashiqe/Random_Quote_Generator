import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './QuoteWindow.css';

const QuoteWindow = () => {

  const [quote,setQuote] =useState({});
  const [random,setRandom] = useState(0)
  const [length,setlength] = useState(0)

  const fetchData = async() =>{
    const response = await axios.get('https://dummyjson.com/quotes');
    console.log(response.data.quotes[0])
    setlength(response.data.quotes.length)
    setQuote(response.data.quotes[random])
  }

  const generateRandom = () =>{
  setRandom( Math.floor(Math.random()*length))
  }

  useEffect(()=>{
    fetchData()
  },[random]);

  return (
    <div className="quote-container">
      <p className="quote-text">{quote.quote}</p>
      <p className="quote-author">- {quote.author}</p>
      <button className="generate-button" onClick={() => generateRandom()}>
        Generate Another Quote
      </button>
    </div>
  );
}

export default QuoteWindow
