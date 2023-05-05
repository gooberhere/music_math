const solveFor = document.querySelector(".solveFor");
const boxes = document.querySelectorAll(".gridbox");
const shuffle = document.querySelector(".shuffle");
const solve = document.querySelector(".solve");
const solveBoxes = document.querySelectorAll(".gridboxSolve");
const saveBoxes = document.querySelectorAll(".gridboxSave");

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
function solutionShuffle() {
  solveNumber = Math.ceil(Math.random() * 1000);
  solveFor.textContent = solveNumber;
}
// calls for inital main grid shuffle on load
solutionShuffle();

// shuffles main grid on click
solveFor.addEventListener("click", solutionShuffle);
// WATCH WEB DEV SIMPLIFIED EVENT LISTENERS VIDEO
// stores clicked numbers in array and pushes to smaller grid
let numbers = [];
let solveBoxNumbers = [];
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const number = e.target.innerText;
    numbers.push(Number(number));
    solveBoxNumbers.push(Number(number));
    for (let i = 0; i < solveBoxes.length; i++) {
      solveBoxes[i].textContent = numbers[i];
    }

    console.log("solveBoxNumbers", solveBoxNumbers);
    console.log("numbers:", numbers);
    // console.log(event);
    // console.log(box);
  });
});
// LOOK UP WHAT THE COMMENTED OUT 'CONST = SUM' IS DOING. I DONT KNOW THIS STUFF.
// adds together numbers in small grid
solve.addEventListener("click", () => {
  const sum = numbers.reduce((partialSum, num) => partialSum * num, 1);
  // const sum = numbers[0] + numbers[1];
  console.log(sum);
  numbers = [];
  solveBoxNumbers = [];
  for (let i = 0; i < solveBoxes.length; i++) {
    solveBoxes[i].textContent = numbers[i];
  }
  for (let i = 0; i < saveBoxes.length; i++) {
    saveBoxes[i].textContent = sum;
  }
});
