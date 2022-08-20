import "./style.scss";
import {getQuotes} from "./api.js";

let quotesData = [];

function randomColor(max) {
  const r = Math.floor(Math.random() * max);
  const g = Math.floor(Math.random() * max);
  const b = Math.floor(Math.random() * max);
  
  // return an object with rgb an rgba color functions
  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 0.6)`,
  };
}

function setRandomBackgroundColor({body, buttons}) {
  const { rgb, rgba } = randomColor(255);

  body.style.backgroundColor = rgba;
  body.style.color = rgb;
  buttons.forEach(button => button.style.backgroundColor = rgb);
}

async function fetchQuotes () {
  const { quotes, pageInfo } = await getQuotes({limit:100});
  quotesData = quotes;
  
}

const randomQuote = () => {
  
  const quotes = quotesData;
  const random = Math.floor(Math.random() * quotes.length);
  return quotes[random];
  
}

const getQuote = async () => {

  let quote = randomQuote();
  let quoteText = quote.content;
  let quoteAuthor = quote.author;
  let tags = quote.tags.join(",");
  let quoteContainer = document.querySelector("#quote-text");
  let tweetButton = document.querySelector("#tweet-quote");

  let quoteEl = document.querySelector("#quote-text > #text");
  let authorEl = document.querySelector("#author > span");

  quoteContainer.animate({opacity: 0}, 500, function(){
    this.animate({opacity: 1, }, 500);
  });



  
  quoteEl.innerHTML = quoteText;
  authorEl.innerHTML = quoteAuthor;
  
  tweetButton.href = `https://twitter.com/intent/tweet?hashtags=${tags}&text=${quoteText} ~${quoteAuthor}`;


}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchQuotes()
  .then(() => {
    getQuote();
  })
  .catch(err => { console.log(err) });

  const quote = document.querySelector("#new-quote");
  const body = document.body;
  const buttons = document.querySelectorAll(".button");

  
  quote.addEventListener("click", function(){
    getQuote();
    setRandomBackgroundColor({body, buttons});
  });
});
