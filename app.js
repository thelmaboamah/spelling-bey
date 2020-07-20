const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();;

const wordList = ["irreplaceable", "formation", "buoy", "corruptible", "denouement"]

let currentWord;

const speaker = document.getElementById("speaker");
const submitBtn = document.getElementById("submit");
const input = document.getElementById("answer");
const mic = document.getElementById("mic");
const spelledWord = document.getElementById("spelled-word");
const correctWord = document.getElementById("correct-word");

const startRecognition = () => {
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
    console.log(answer);
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