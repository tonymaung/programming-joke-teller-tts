const button = document.getElementById("button")
const audioElement = document.getElementById("audio");

//Passing Joke text to speech 
function tellMeJoke(text) {
    let textToSpeech = text.trim().replace(/ /g, '%20');
    console.log(text)
    VoiceRSS.speech({
        key: 'c78ac54d8a474ab191435006989350a6',
        src: `${textToSpeech}`,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}
//Toggle Button 
function toggleButton() {
    button.disabled = !button.disabled
}
//get Jokes from Joke URL

async function getJokes() {
    let text = ''
    try {
        //fetch data from URL
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit")
            //convert it into JSON
        const data = await response.json()
            //Check whether two part or not
        if (data.setup) {
            text = `${data.setup} ... ${data.delivery}`
        } else {
            text = data.joke;
        }
        //text to Speech
        tellMeJoke(text)
            //Disable button while playing audio
        toggleButton()
    } catch (err) {
        console.log("Fetch failed", err)
    }
}

//Event Listeners
button.addEventListener("click", getJokes); //Click to get new jokes
audioElement.addEventListener("ended", toggleButton) //enable button after the audio is played