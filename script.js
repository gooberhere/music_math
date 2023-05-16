const solveFor = document.querySelector(".solveFor");
const boxes = document.querySelectorAll(".gridbox");
const shuffle = document.querySelector(".shuffle");
const multiply = document.querySelector(".multiply");
const add = document.querySelector(".add");
const multiBoxes = document.querySelectorAll(".gridboxSolve");
const addBoxes = document.querySelectorAll(".gridboxSave");
const root = document.querySelector(":root");
let reset = false;
let numbers = [];
let multiBoxNumbers = [];
let multipliedNumbers = [];
// let multiBoxNumbers = [];

// calls for inital main grid and solution shuffle on load
initialShuffle();
gridShuffle();

// randomizes numbers across the main grid
function gridShuffle() {
  boxes.forEach((box) => {
    let boxNumbers = Math.ceil(Math.random() * 7);
    box.textContent = boxNumbers;
    box.style.color = "white";
    console.log(boxNumbers);
    return boxNumbers;
  });
}

// randomizes numbers in the solution box
function initialShuffle() {
  solveNumber = Math.ceil(Math.random() * 100);
  solveFor.textContent = solveNumber;
}
// resets everything
function resetAll() {
  reset = true;

  gridShuffle();
  initialShuffle();

  numbers = [];
  multipliedNumbers = [];
  multiBoxNumbers = [];
  multiBoxes.forEach((multiBox) => {
    multiBox.textContent = "";
  });
  addBoxes.forEach((addBox) => {
    addBox.textContent = "";
  });
  boxes.forEach((box) => {
    box.classList.remove("selected", "saved");
    box.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  });

  document.body.style.backgroundImage = "linear-gradient(45deg, blue, purple)";
  root.style.setProperty("--border-color", "yellow");
  document.querySelector(".winMessage").style.display = "none";
  document.querySelector(".loseMessage").style.display = "none";
}
// function colorChange() {
//   let colorInterval = setInterval(winningColors, 500);
//   // randomizes gridbox colors
//   function winningColors() {
//     let button = solveFor;
//     button.style.color = button.style.color == "white" ? "blue" : "white";
//   }
// }

// randomizes gridbox colors

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function winningColors() {
  while (!reset) {
    function randomColor() {
      return Math.floor(Math.random() * (256 - 128) + 128);
    }
    let colors = [];

    for (let i = 0; i < boxes.length; i++) {
      if (reset) break;

      let color1 = randomColor();
      let color2 = randomColor();
      let color3 = randomColor();
      let color = `rgba(${color1}, ${color2}, ${color3}, 1)`;
      colors.push(color);

      boxes[i].style.backgroundColor = colors[i];
      await sleep(100);
    }
  }
  reset = false;
}

async function losingColors() {
  while (!reset) {
    function randomColor() {
      return Math.floor(Math.random() * 128);
    }
    let colors = [];

    for (let i = 0; i < boxes.length; i++) {
      if (reset) break;
      let color1 = randomColor();
      let color2 = randomColor();
      let color3 = randomColor();
      let color = `rgba(${color1}, ${color2}, ${color3}, 1)`;
      colors.push(color);

      boxes[i].style.backgroundColor = colors[i];
      await sleep(100);
    }
  }
  reset = false;
}

// function stopColorChange() {
//   clearInterval(colorInterval);
// }

// shuffle.addEventListener("click", gridShuffle);

// shuffles main grid on click
solveFor.addEventListener("click", resetAll);
// WATCH WEB DEV SIMPLIFIED EVENT LISTENERS VIDEO
// stores clicked numbers in array and pushes to smaller grid

// original selection function
boxes.forEach((box) => {
  // let boxClicked = false;
  box.addEventListener("click", (e) => {
    box.classList.toggle("selected");

    if (box.classList.contains("selected") && box.classList.contains("saved")) {
    } else if (box.classList.contains("selected")) {
      const number = e.target.innerText;
      numbers.push(Number(number));
      multiBoxNumbers.push(Number(number));
      for (let i = 0; i < multiBoxes.length; i++) {
        multiBoxes[i].textContent = numbers[i];
      }
    } else {
      const number = e.target.innerText;
      const removeFromIndex = numbers.indexOf(Number(number));
      numbers.splice(removeFromIndex, 1);
      for (let i = 0; i < multiBoxes.length; i++) {
        multiBoxes[i].textContent = numbers[i];
      }
    }
    console.log("numbers array:", numbers);
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
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].classList.contains("selected")) {
      boxes[i].classList.add("saved");
      console.log(boxes);
    }
  }
});

add.addEventListener("click", () => {
  let newSum = multipliedNumbers.reduce(
    (partialSum, num) => partialSum + num,
    0
  );
  console.log(newSum);
  if (Number(newSum) == Number(solveNumber)) {
    document.body.style.backgroundImage =
      "linear-gradient(45deg, green, yellow)";
    root.style.setProperty("--border-color", "white");
    // document.querySelector(".winMessage").style.display = "block";
    // solveFor.style.zIndex = "1";

    for (let i = 0; i < boxes.length; i++) {
      let winner = ["W", "I", "N", "N", "E", "R", "!", "!"];
      boxes[i].textContent = winner[i];
    }
    winningColors();
    solveFor.textContent = "RESET";
  } else {
    let loser = ["L", "O", "S", "E", "R", "!", "!", "!"];
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = loser[i];
    }

    document.body.style.backgroundImage = "linear-gradient(45deg, orange, red)";
    root.style.setProperty("--border-color", "white");

    // document.querySelector(".loseMessage").style.display = "block";
    // solveFor.style.zIndex = "1";
    losingColors();

    solveFor.textContent = "RESET";
    newSum = 0;
  }
});
