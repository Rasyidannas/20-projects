const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []

//Show Loading
function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

//Hide loading
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}


//Show New Quotes
function newQuotes(){
    showLoadingSpinner()

    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // console.log(quote);

    //this id DOM
    //check if author field is blank and replace with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author
    }

    //check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text
    removeLoadingSpinner()
}

//Get Quotes from API
async function getQuotes(){
    showLoadingSpinner()
    // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en'

    const apiUrl = 'https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl)
        //response.json for stream and reads it to completion
        apiQuotes = await response.json()
        // console.log(apiQuotes);

        newQuotes()

    }catch (error){
        //catch error here
        console.log('Whoops, no quote', error);

        //this is name function recursive and it will lop function self when error
        // getQuotes()
    }
}


//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '__blank')
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuotes()

