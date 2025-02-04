"use strict";

//partea care creaza structura html de baza

let container = document.createElement("div");
let styleLink = document.createElement("link");

styleLink.setAttribute("href", "beforeGameStyles.css");
styleLink.setAttribute("rel", "stylesheet");

document.body.appendChild(container);
document.body.style.backgroundColor = "#222";
document.head.appendChild(styleLink);
container.classList.add("container");
container.innerHTML = `
  <div class="players-box">
    <h1>Create players</h1>
    <div class="player-control-btns">
      <button id="create-player" class="btn"><p>Add player</p></button>
      <button id="delete-player" class="btn"><p>Delete player</p></button>
    </div>
    <input type="text" id ="player1" placeholder="Player 1" class="box player1"/>
  </div>
  <div class="game-box">
    <div>
      <select class="dropdown" id="difficulty" ></select> 
    </div>
   
    <div>
      <select class="dropdown" id="category"></select>
    </div>
    <div>
      <select class="dropdown" id="answer-type"></select>
    </div>
    <div class="submit-box">
    <button id="submit" class="btn submit">Start Game</button></div>
  </div>
`;
//partea ce se ocupa cu butoanele de creare a jucatorilor maxim 4 minim 1
let createPlayerBtn = document.getElementById("create-player");
let deletePlayerBtn = document.getElementById("delete-player");
let firstPlayer = document.getElementById("player1");
let playerNr = 1;

//partea care creaza player nou
let playerInputs = [firstPlayer];
createPlayerBtn.addEventListener("click", function () {
  if (playerNr <= 3) {
    let playerClass = "Player " + `${playerNr + 1}`;
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = `${playerClass}`;
    inputElement.classList.add("box", `player${playerNr + 1}`);
    inputElement.setAttribute("id", `player${playerNr + 1}`);
    inputElement.setAttribute("value", "");
    document.querySelector(".players-box").appendChild(inputElement);
    playerInputs.push(inputElement);
    playerNr++;
  }
});

//partea care sterge un player

deletePlayerBtn.addEventListener("click", function () {
  if (playerNr > 2) {
    let playersBox = document.querySelector(".players-box");
    let lastPlayerInput = playersBox.querySelector(`.player${playerNr - 1}`);
    playersBox.removeChild(lastPlayerInput);
    playerInputs.remove(lastPlayerInput);
    playerNr--;
  }
});

//partea din dreapta - Game

// @@@@@@ DROPDOWN ARRAYS @@@@@@ //
let difficultyOptions = ["Any difficulty", "Easy", "Medium", "Hard"];
let difficultyValues = [
  "",
  "&difficulty=easy",
  "&difficulty=medium",
  "&difficulty=hard",
];
let answerOptions = ["Any type", "With multiple answers", "With 2 answers"];
let answerValues = ["", "&type=multiple", "&type=boolean"];
let categoryOptions = [
  "All categories",
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
];

let categoryValues = [
  "",
  "&category=9",
  "&category=10",
  "&category=11",
  "&category=12",
  "&category=13",
  "&category=14",
  "&category=15",
  "&category=16",
  "&category=17",
  "&category=18",
  "&category=19",
  "&category=20",
  "&category=21",
  "&category=22",
  "&category=23",
  "&category=24",
  "&category=25",
  "&category=26",
  "&category=27",
  "&category=28",
  "&category=29",
  "&category=30",
  "&category=31",
  "&category=32",
];
// functie ce itereaza prin array-urile de values si de nume
let difficulty = document.getElementById("difficulty");
let category = document.getElementById("category");
let answer = document.getElementById("answer-type");

function createOptions(selectedElement, optionsArray, valuesArray) {
  for (let i = 0; i < optionsArray.length; i++) {
    let option = document.createElement("option");
    option.value = valuesArray[i];
    option.text = optionsArray[i];
    selectedElement.appendChild(option);
  }
}
createOptions(difficulty, difficultyOptions, difficultyValues);
createOptions(answer, answerOptions, answerValues);
createOptions(category, categoryOptions, categoryValues);
/*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
USE THIS IF YOU WANT TO TEST THE VALUES OF DROPDOWNS IN CONSOLE
function testValues(element) {
  element.addEventListener("change", function () {
    console.log(element.value);
  });
}

testValues(difficulty);
testValues(answer);
testValues(category);
vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
*/

// PARTEA CE SE OCUPA DE BUTONUL DE SUBMIT SI SALVEAZA URL-ul pentru fetch;
let url;
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function () {
  let categoryLink = category.value;
  let answerLink = answer.value;
  let difficultyLink = difficulty.value;
  createURL(categoryLink, difficultyLink, answerLink);

  //do not remove this lines - ment to do something and turned off just for working purpose;
  // document.body.removeChild(container);
  // document.head.removeChild(styleLink);
  console.log(playerNr);
  console.log(playerInputs);

  let playerNames = [];
  for (let i = 0; i <= playerInputs.length; i++) {
    playerNames.push(playerInputs[i].value);
  }
});

function createURL(par1, par2, par3) {
  url = "https://opentdb.com/api.php?amount=50";
  url = url + par1 + par2 + par3;
  console.log(url);
}
