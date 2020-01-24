$(document).ready(() => {
    setWord()
    input.value = ""
    domTimer.innerHTML = time
    domScore.innerHTML = score
    $(input).prop("disabled", true)
    $(btnPause).prop("disabled", true)
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
var btnPause = document.getElementById("btnPause")
var health = document.getElementById("healthBar")

var currWord = ""
var tempWord = ""
var aux = ""
var counter = 0

var time = 0
var score = 0
var running = false

var intervalTimer
var intervalHealth

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

function startHealthAnimation() {
    if (health.value > 0) {
        health.value -= 1
    } else {
        console.log("terminado")
        clearInterval(intervalTimer)
        clearInterval(intervalHealth)
        $(input).prop("disabled", true)
        // $(btnStart).prop("disabled", true)
        input.value = ""
        running = false
    }
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

        health.value += 7
    }
})

btnStart.addEventListener('click', () => {
    $("#userInput").removeAttr("disabled")
    input.focus()
    intervalTimer = setInterval(setTimer, 1000)
    intervalHealth = setInterval(startHealthAnimation, 100)
    $(btnStart).prop("disabled", true)
    $(btnPause).prop("disabled", false)
    running = true
})

btnRestart.addEventListener('click', () => {
    clearInterval(intervalTimer)
    clearInterval(intervalHealth)
    score = 0
    time = 0
    domTimer.innerHTML = time
    domScore.innerHTML = score
    health.value = 100
    $(btnStart).prop("disabled", false)
    $(input).prop("disabled", true)
    $(btnPause).prop("disabled", true)
    setWord()
    running = false
})

btnPause.addEventListener('click', () => {
    if (running) {
        $(input).prop("disabled", true)
        clearInterval(intervalTimer)
        clearInterval(intervalHealth)
        btnPause.innerHTML = "Reanudar"
        running = false
    } else {
        $(input).prop("disabled", false)
        input.focus()
        intervalTimer = setInterval(setTimer, 1000)
        intervalHealth = setInterval(startHealthAnimation, 100)
        btnPause.innerHTML = "Pausar"
        running = true
    }
})