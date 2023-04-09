const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

//Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    // console.log('tell me:', joke);
    
    //this is call VoiceRSS in voice.js
    VoiceRSS.speech({
        key: 'ef6305b1d02945afbda0350825823ff7',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

// Get Jokes from Joke API
async function getJokes(){
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        //this is for handel type single and twopart Joke API Data
        if(data.setup){
            joke = `${data.setup}...${data.delivery}`
        }else{
            joke = data.joke
        }
        // console.log(joke);

        //text-to-speech
        tellMe(joke)

        //disable button
        toggleButton()
    } catch (error) {
        //Catch Errors Here
        console.log('Whoops', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)
