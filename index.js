var typer = document.getElementsByName("typer");
var typerId = document.getElementById("typer");
var toGo = document.getElementById("toGo");
var correctHTML = document.getElementById("correct");
var wrongHTML = document.getElementById("wrong");
var resultHTML = document.getElementById("result");
var solution = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "Xray", "Yankee", "Zulu"]
var entries;
var question = "";
var correct = [];
var wrong = [];

typerId.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("validate").click();
  }
});

function game() {
  //var solution = ["Alfa", "Bravo", "Charlie"];
  entries = solution;
  for (let i = 0; i < entries.length; i++) {
    new_index = Math.floor(Math.random() * entries.length);
    var temp = entries[new_index];
    entries[new_index] = entries[i];
    entries[i] = temp;
  }
  console.log(entries, solution);
  var correct = [];
  var wrong = [];
  resultHTML.innerText = "";
  getNext();
}

function validate() {
  if (entries.length >= 0) {
    if (question == typer[0].value) {
      resultHTML.innerText = "juist";
      correct.push(question);
    } else {
      resultHTML.innerText = "fout";
      wrong.push(question);
    }
    getNext();
    if (entries.length == 0) {
      resultHTML.innerText = `Gedaan, je ${wrong.length + (wrong.length == 1 ? " fout was" : "fouten waren")}: \n ${wrong.sort().toString()}`;
    }
  }
}

function getNext() {
  question = entries.splice(0, 1).toString();
  typer[0].value = question.charAt(0);
  updateHTML();
}

function updateHTML() {
  toGo.innerHTML = `Nog ${entries.length} te gaan`;
  correctHTML.innerText = `${correct.length} juist`;
  wrongHTML.innerText = `${wrong.length} fout`;
}