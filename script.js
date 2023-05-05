const solveFor = document.querySelector(".solveFor");
const boxes = document.querySelectorAll(".gridbox");
const shuffle = document.querySelector(".shuffle");
const solve = document.querySelector(".solve");
let number1;
let number2;

shuffle.addEventListener("click", function () {
  boxes.forEach((box) => {
    boxNumbers = Math.ceil(Math.random() * 10);
    box.textContent = boxNumbers;
    delete number1;
    delete number2;
    number2 = 0;
    box.style.color = "white";
  });
});

solveFor.addEventListener("click", function () {
  solveNumber = Math.ceil(Math.random() * 1000);
  solveFor.textContent = solveNumber;
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    number1 = box.textContent;
    console.log(number1);
  });
});

solve.addEventListener("click", () => {
  solution = Number(number1 * number2);
  console.log(solution);
});
