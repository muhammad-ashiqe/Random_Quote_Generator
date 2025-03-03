import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './QuoteWindow.css';

const QuoteWindow = () => {
  const [quotes, setQuotes] = useState([]); // Store all quotes
  const [quote, setQuote] = useState({}); // Current quote to display
  const [authorImage, setAuthorImage] = useState(''); // Author image URL
  const [loading, setLoading] = useState(true); // Loading state

  // Your Unsplash API key
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Fetch all quotes from the API
  const fetchQuotes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes');
      setQuotes(response.data.quotes); // Store all quotes
      generateRandomQuote(response.data.quotes); // Generate a random quote
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  // Generate a random quote from the fetched quotes
  const generateRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Random index
    const randomQuote = quotes[randomIndex]; // Get random quote
    setQuote(randomQuote); // Set the random quote
    fetchAuthorImage(randomQuote.author); // Fetch author image
  };

  // Fetch author image from Unsplash
  const fetchAuthorImage = async (authorName) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${authorName}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (response.data.results.length > 0) {
        setAuthorImage(response.data.results[0].urls.small); // Use the first image result
      } else {
        setAuthorImage(''); // No image found
      }
    } catch (error) {
      console.error('Error fetching author image:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch quotes on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quote-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="quote-text">❝ {quote.quote} ❞</p>
          <p className="quote-author">- {quote.author}</p>
          {authorImage && (
            <img
              src={authorImage}
              alt={quote.author}
              className="author-image"
            />
          )}
          <button
            className="generate-button"
            onClick={() => generateRandomQuote(quotes)}
          >
            Generate Another Quote
          </button>
        </>
      )}
    </div>
  );
};

export default QuoteWindow;