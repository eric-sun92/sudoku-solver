const puzzleBoard = document.querySelector("#puzzle");
const solveBtn = document.querySelector("#solve-btn");
const squares = 81;
let submission = [];
const solutionDisplay = document.querySelector("#solution");

for (let i = 0; i < squares; i++) {
  const inputElem = document.createElement("input");
  inputElem.setAttribute("type", "number");
  inputElem.setAttribute("min", "1");
  inputElem.setAttribute("max", "9");

  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 21 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElem.classList.add("grey");
  }

  puzzleBoard.appendChild(inputElem);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};

const populate = (solvable, solution) => {
  if (solvable && solution) {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
    solutionDisplay.textContent = "This is the answer";
  } else {
    solutionDisplay.innerHTML = "OOPS, this is not solvable";
  }
};

const solve = () => {
  joinValues();
  const data = { numbers: submission.join("") };

  console.log("data", data);
  fetch("http://localhost:8000/solve", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populate(data.data.canBeSolved, data.data.solution);
      submission = [];
    })
    .catch((err) => console.log(err));
};

solveBtn.addEventListener("click", solve);
