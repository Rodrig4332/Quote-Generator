const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote 
function newQuote() {
    showloadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContext = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length >150) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent =quote.text;
    removeLoadSpinner();
}

// Get Quotes from API 
async function getQuotes() {
    showloadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    }catch (error) {
      // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank');
}

// Event Listener 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuotes();