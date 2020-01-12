$(document).ready(() => {
    setWord()
    input.value = ""
    domTimer.innerHTML = time
    domScore.innerHTML = score
})

/// AUDIO/FX

var fxCompleted = new Howl({
    src: ['extras/audioFX/word_complete.wav'],
    volume: 0.5
})

var fxCorrect = new Howl({
    src: ['extras/audioFX/correct_sound.mp3'],
    volume: 0.5
})

var fxWrong = new Howl({
    src: ['extras/audioFX/wrong_sound.wav'],
    sprite: {
        wrong: [0, 2600]
    },
    volume: 0.5
})

// VARIABLES

var output = document.getElementById("word")
var input = document.getElementById("userInput")
var domTimer = document.getElementById("timer")
var domScore = document.getElementById("score")
var btnStart = document.getElementById("btnStart")
var btnRestart = document.getElementById("btnRestart")

var currWord = ""
var tempWord = ""
var aux = ""
var counter = 0

var time = 0
var score = 0

// FUNCTIONS

function setWord() {
    let random = Math.floor(Math.random() * words.length)
    currWord = words[random]
    tempWord = currWord
    output.innerHTML = currWord
}

function setTimer() {
    time += 1
    domTimer.innerHTML = time
}

input.addEventListener('keyup', (event) => {
    let x = event.key

    if (x == currWord.charAt(counter)) {
        tempWord = tempWord.slice(tempWord.indexOf(x) + 1)
        // console.log(tempWord)
        fxCorrect.play()
        aux += x
        // console.log("aux = " + aux)
        output.innerHTML = ""
        output.innerHTML = aux.fontcolor("red") + tempWord
        counter++
    } else {
        let string = String(input.value)
        input.value = string.slice(0, string.length - 1)
        fxWrong.stop()
        fxWrong.play('wrong')

        score -= 10
        domScore.innerHTML = score
    }

    if (counter === currWord.length) {
        setWord()
        // console.log("nueva = " + currWord)
        input.value = ""
        counter = 0
        aux = ""

        fxCompleted.play()

        score += 25
        domScore.innerHTML = score
    }
})

var intervalTimer
btnStart.addEventListener('click', () => {
    $("#userInput").removeAttr("disabled")
    input.focus()
    intervalTimer = setInterval(setTimer, 1000)
})

btnRestart.addEventListener('click', () => {
    clearInterval(intervalTimer)
    score = 0
    time = 0
    domTimer.innerHTML = time
    domScore.innerHTML = score
})