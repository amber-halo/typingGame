$(document).ready(() => {
    setWord()
    input.value = ""
})

// let wordsData = "Lorem ipsum dolor sit amet consectetur adipiscing elit Curabitur leo neque interdum interdum purus ut" 
//     + "semper tincidunt felis Nunc tempor eros in tristique faucibus Donec pellentesque purus id leo ullamcorper a feugiat nulla"
//     + "consectetur Pellentesque metus neque ultrices eget lacinia id efficitur nec augue Nunc auctor mi eu rutrum congue Nullam ac" 
//     + "mauris vel urna pharetra dapibus Integer in tincidunt purus vitae tincidunt lacus Sed in erat non nisi iaculis pretium hendrerit"
//     + "nec turpis Nullam a tortor nec ipsum pulvinar efficitur Curabitur enim enim placerat quis lacinia in semper a orci Suspendisse"
//     + "vel diam eget nisi vestibulum laoreet ut vitae sapien Etiam sollicitudin justo at suscipit mattis Phasellus sit amet tincidunt"
//     + "metus Vivamus auctor sem et blandit dignissim elit turpis convallis leo vel vehicula lectus orci eu erat In hac habitasse"
//     + "platea dictumst Cras ut laoreet felis"

// var words = wordsData.toLowerCase().split(" ")
// var words = wordsData.toLowerCase().split(" ")

var out = document.getElementById("word")
var input = document.getElementById("userInput")

var currWord = ""
var tempWord = ""
var aux = ""
var counter = 0

function setWord() {
    let random = Math.floor(Math.random() * words.length)
    currWord = words[random]
    tempWord = currWord
    out.innerHTML = currWord
}

input.addEventListener('keyup', (event) => {
    let x = event.key

    if (x == currWord.charAt(counter)) {
        tempWord = tempWord.slice(tempWord.indexOf(x) + 1)
        counter++
        // console.log(tempWord)
        aux += x
        // console.log("aux = " + aux)
        out.innerHTML = ""
        out.innerHTML = aux.fontcolor("blue") + tempWord
    } else {
        let string = String(input.value)
        input.value = string.slice(0, string.length - 1)
    }

    if (counter === currWord.length) {
        setWord()
        // console.log("nueva = " + currWord)
        input.value = ""
        counter = 0
        aux = ""
    }
})