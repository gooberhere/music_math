const solveFor = document.querySelector(".solveFor");
const boxes = document.querySelectorAll(".gridbox");
const shuffle = document.querySelector(".shuffle");
const multiply = document.querySelector(".multiply");
const add = document.querySelector(".add");
const multiBoxes = document.querySelectorAll(".gridboxSolve");
const addBoxes = document.querySelectorAll(".gridboxSave");
const root = document.querySelector(":root");

let numbers = [];
let multipliedNumbers = [];
let multiBoxNumbers = [];

// randomizes numbers across the main grid
shuffle.addEventListener("click", function () {
  boxes.forEach((box) => {
    let boxNumbers = Math.floor(Math.random() * 11);
    box.textContent = boxNumbers;
    box.style.color = "white";
    console.log(boxNumbers);
    return boxNumbers;
  });
});
// randomizes numbers in the solution box
function initialShuffle() {
  solveNumber = Math.ceil(Math.random() * 1000);
  solveFor.textContent = solveNumber;
}
// calls for inital main grid shuffle on load
initialShuffle();

function reShuffle() {
  solveNumber = Math.ceil(Math.random() * 1000);
  solveFor.textContent = solveNumber;
  numbers = [];
  multipliedNumbers = [];
  multiBoxNumbers = [];
  multiBoxes.textContent = 0;
}

// shuffles main grid on click
solveFor.addEventListener("click", reShuffle);
// WATCH WEB DEV SIMPLIFIED EVENT LISTENERS VIDEO
// stores clicked numbers in array and pushes to smaller grid

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const number = e.target.innerText;
    numbers.push(Number(number));
    multiBoxNumbers.push(Number(number));
    for (let i = 0; i < multiBoxes.length; i++) {
      multiBoxes[i].textContent = numbers[i];
    }

    console.log("multiBoxNumbers", multiBoxNumbers);
    console.log("numbers:", numbers);
    // console.log(event);
    // console.log(box);
  });
});
// LOOK UP WHAT THE COMMENTED OUT 'CONST = SUM' IS DOING. I DONT KNOW THIS STUFF.
// adds together numbers in small grid
multiply.addEventListener("click", () => {
  const sum = numbers.reduce((partialSum, num) => partialSum * num, 1);
  // const sum = numbers[0] + numbers[1];
  console.log(sum);
  multipliedNumbers.push(Number(sum));
  numbers = [];
  multiBoxNumbers = [];
  for (let i = 0; i < multiBoxes.length; i++) {
    multiBoxes[i].textContent = numbers[i];
  }
  for (let i = 0; i < addBoxes.length; i++) {
    addBoxes[i].textContent = multipliedNumbers[i];
  }
});

add.addEventListener("click", () => {
  const newSum = multipliedNumbers.reduce(
    (partialSum, num) => partialSum + num,
    0
  );
  console.log(newSum);
  if (Number(newSum) == Number(solveNumber)) {
    document.body.style.backgroundImage =
      "linear-gradient(45deg, green, yellow)";
    root.style.setProperty("--border-color", "white");
  } else {
    solutionShuffle();
    newSum = 0;
  }
});
