var typer = document.getElementsByName("typer");
var typerId = document.getElementById("typer");
var toGo = document.getElementById("toGo");
var correctHTML = document.getElementById("correct");
var wrongHTML = document.getElementById("wrong");
var resultHTML = document.getElementById("result");
var solution = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "Xray", "Yankee", "Zulu"]
//var solution = ["Alfa", "Bravo", "Charlie"];
var entries;
var question = "";
var correct = [];
var wrong = [];
var wrongInput = [];
var done;
//Passwordchecker
var solutionww = "1HmuVgV2J9mT83" //"test"
var inputww = document.getElementById("inputww");
var outputww = document.getElementById("correctie");


window.onload = function() {
  resetGame();
};

typerId.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("validate").click();
  }
});

function game() {
  entries = solution.slice();
  for (let i = 0; i < entries.length; i++) {
    new_index = Math.floor(Math.random() * entries.length);
    var temp = entries[new_index];
    entries[new_index] = entries[i];
    entries[i] = temp;
  }
  resetGame();
  getNext();
}

function validate() {
  if (entries.length + 1 >= 1 && !done) {
    if (question == typer[0].value) {
      resultHTML.innerText = "juist";
      correct.push(question);
    } else {
      resultHTML.innerText = "fout";
      wrong.push(question);
      wrongInput.push(typer[0].value);
    }      
  } 
  if (entries.length == 0) {
    done = true;
    typer[0].value = "";
    updateHTML();
    resultHTML.innerText = `${wrong.length == 0 ? "Perfecte score" : `Gedaan, je ${wrong.length + (wrong.length == 1 ? " fout was" : " fouten waren")}: \n ${wrongInput.sort().toString()} \n Het antwoord was: \n ${wrong.sort().toString()}`}`
  } else {
    getNext();
  }
}

function getNext() {
  question = entries.splice(0, 1).toString();
  typer[0].value = question.charAt(0);
  updateHTML();
}

function updateHTML() {
  toGo.innerHTML = `Nog ${entries.length + " / " + solution.length} te gaan`;
  correctHTML.innerText = `${correct.length} juist`;
  wrongHTML.innerText = `${wrong.length} fout`;
}

function resetGame() {
  correct = [];
  wrong = [];
  done = false;
  resultHTML.innerText = "";
  typer[0].value = "";
}

//Passwordchecker
function checkAnswer(){
    outputww.innerHTML = (inputww.value == solutionww ? "Juist" : correctieFunctie(inputww.value))
    inputww.value = ""
}

function correctieFunctie(input){
    var solArray = solutionww.split("");
    var inputArray = input.split("");
    for(var i = 0; i < solArray.length; i++){
        if(solArray[i] !== inputArray[i]){
            solArray[i] = `<mark>${solArray[i]}</mark>`
        }
    }
    correctedSol = solArray.join("")
    //console.log(correctedSol);
    var output = "Fout <br>" + input + "<br>" + correctedSol
    return output
}
