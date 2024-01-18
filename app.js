// api generator url - https://opentdb.com/api_config.php
let container = document.querySelector(".container");

function randomize(values) {
  let index = values.length,
    randomIndex;

  while (index != 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;

    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }

  return values;
}

function getAll() {
  var adr = ADRESA_API;
  fetch(adr)
      .then(function (response) {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error("No data available");
          }
      })
      .then(function (data) {
          let usableData = data.results;
          for (var question of usableData) {
              displayPost(question);
          }
      })
      .catch((eroare) => alert(eroare));
}    
    
function displayPost(element) {
  let li = document.createElement("li");    
  container.appendChild(li);
  const span = document.createElement('span');
  span.textContent = element.question;
  let answersArray = element.incorrect_answers;

  answersArray.push(element["correct_answer"]);
  randomize(answersArray);
  // TODO - think of another way of adding class for correct/ wrong answers
  let answerClass = [];
  for (let i = 0; i < answersArray.length; i++) {
    if(answersArray[i] === element["correct_answer"]) {
      answerClass.push("correct-answer");
    } else {
      answerClass.push("incorrect-answer");
    }
  }

  let answers = document.createElement('div');
  // TODO - next part should be optimized to generate options dinamically (ex. for this case, there are only 4 answers, but what if there is an inequal number of answers for the questions)
  // TODO - the game also can have True/ False answers - the design pattern for this game mode should be created
  answers.innerHTML = `
  <div>
    <input type="radio" id="answer1" class="${answerClass[0]}" name="answers" value="HTML">
    <label for="answer1">${answersArray[0]}</label><br>
    <input type="radio" id="answer2" class="${answerClass[1]}" name="answers" value="CSS">
    <label for="answer2">${answersArray[1]}</label><br>
    <input type="radio" id="answer3" class="${answerClass[2]}" name="answers" value="JavaScript">
    <label for="answer3">${answersArray[2]}</label><br>
    <input type="radio" id="answer4" class="${answerClass[3]}" name="answers" value="JavaScript">
    <label for="answer4">${answersArray[3]}</label>
  </div>`;

  li.appendChild(span);
  li.appendChild(answers);
  // console.log(element);
  // console.log(answersArray);
}

// test fork