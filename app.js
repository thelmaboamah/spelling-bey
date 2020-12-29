/*
  I did this during a Hack and Tell session at RC. It uses Speech Synthesis
  and Speech Recognition browser APIs, which were only available in Chrome at
  the time of development
*/

// TODO: Browser checks since this will only work in Chrome

const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();

const wordList = ["irreplaceable", "formation", "lemonade", "dangerously", "upgrade", "resentment"];

let currentWord;

const speaker = document.getElementById("speaker");
const submitBtn = document.getElementById("submit");
const input = document.getElementById("answer");
const mic = document.getElementById("mic");
const spelledWord = document.getElementById("spelled-word");
const correctWord = document.getElementById("correct-word");

const startRecognition = () => {
    if (!currentWord) return;

    recognition.start();
}

recognition.onresult = (event) => {
    let word = event.results[0][0].transcript;
    word = word.replace(/\s/g, '');
    
    checkAnswer(null, word);
}

recognition.onspeechend = (event) => {
    recognition.stop();
}

const sayNextWord = () => {
    currentWord = wordList.shift();
    const pretext = "Your word is ";
 
    synth.speak(new SpeechSynthesisUtterance(pretext + currentWord));
}

const checkAnswer = (event, answer = input.value) => {
    if (!answer) return;

    if (answer.toLowerCase() === currentWord) {
        spelledWord.style.color = "green";
        spelledWord.textContent = answer;
        synth.speak(new SpeechSynthesisUtterance("That's correct"));
    } else {
        spelledWord.style.color = "red";
        spelledWord.textContent = answer;
        spellWord();
    }
    correctWord.textContent = currentWord;
    currentWord = "";
    input.value = "";
}

const spellWord = () => {
    synth.speak(new SpeechSynthesisUtterance("Sorry, the correct spelling is "));
    const spelledWord = new SpeechSynthesisUtterance(currentWord.split('').join(' '));
    spelledWord.rate = 0.75;
    synth.speak(spelledWord)
}

speaker.addEventListener("click", sayNextWord);
submitBtn.addEventListener("click", checkAnswer);
mic.addEventListener("click", startRecognition);
