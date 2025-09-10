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
