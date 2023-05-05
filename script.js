const solveFor = document.querySelector(".solveFor");
const boxes = document.querySelectorAll(".gridbox");
const shuffle = document.querySelector(".shuffle");
const solve = document.querySelector(".solve");

shuffle.addEventListener("click", function () {
  boxes.forEach((box) => {
    boxNumbers = Math.ceil(Math.random() * 10);
    box.textContent = boxNumbers;
    box.style.color = "white";
    console.log(boxNumbers);
    return boxNumbers;
  });
});

solveFor.addEventListener("click", function () {
  solveNumber = Math.ceil(Math.random() * 1000);
  solveFor.textContent = solveNumber;
});
// WATCH WEB DEV SIMPLIFIED EVENT LISTENERS VIDEO
let numbers = [];
boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    const number = e.target.innerText;
    numbers.push(Number(number));
    console.log(numbers);
    // console.log(event);
    // console.log(box);
  });
});
// LOOK UP WHAT THE COMMENTED OUT 'CONST = SUM' IS DOING. I DONT KNOW THIS STUFF.
solve.addEventListener("click", () => {
  //   const sum = numbers.reduce((partialSum, num) => partialSum + num, 0);
  const sum = numbers[0] + numbers[1];
  console.log(sum);
  numbers = [];
});
