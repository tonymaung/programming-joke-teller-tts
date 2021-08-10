const button = document.getElementById("button")
const audioElement = document.getElementById("audio");

//get Jokes from Joke URL

async function getJokes() {
    let text = ''
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit")
        const data = await response.json()
        if (data.setup) {
            text = `${data.setup} ... ${data.delivery}`
        } else {
            text = data.joke;
        }
        //text to Speech
        tellMeJoke(text)
            //Toggle button
        toggleButton()
    } catch (err) {
        console.log("Fetch failed", err)
    }
}


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

function toggleButton() {
    button.disabled = !button.disabled
}
//Event Listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton)