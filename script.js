
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

//stores calulator startup values
let currentNumber = "0";
let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;
//updates the display
function updateDisplay() {
  display.textContent = currentNumber;
}
//adds the inputed number to the screen
function enterNumber(number) {
  if (waitingForSecondNumber === true || currentNumber === "Error") {
    currentNumber = number;
        waitingForSecondNumber = false;
    } else if (currentNumber === "0") {
    currentNumber = number;
    } else {
    currentNumber = currentNumber + number;
  }

  updateDisplay();
}

function calculate(numberOne, numberTwo, operator) {
  if (operator === "+") {
    return numberOne + numberTwo;
  }

  if (operator === "-") {
    return numberOne - numberTwo;
  }

  if (operator === "*") {
    return numberOne * numberTwo;
  }

  if (operator === "/") {
    if (numberTwo === 0) {
      return null;
    }

    return numberOne / numberTwo;
  }
}
//stores first number and the choses operation
function chooseOperator(operator) {
  let inputNumber = parseFloat(currentNumber);

    if (currentOperator !== null && waitingForSecondNumber === true) {
    currentOperator = operator;
    return;
    }

    if (firstNumber === null) {
    firstNumber = inputNumber;
        } else if (currentOperator !== null) {
        let answer = calculate(firstNumber, inputNumber, currentOperator);

    if (answer === null) {
      showError();
      return;
    }

    currentNumber = String(answer);
    firstNumber = answer;
    updateDisplay();
  }

  currentOperator = operator;
  waitingForSecondNumber = true;
}
//calculates the answer and displays it
function showAnswer() {
  if (firstNumber === null || currentOperator === null) {
    return;
  }

  let secondNumber = parseFloat(currentNumber);
  let answer = calculate(firstNumber, secondNumber, currentOperator);

  if (answer === null) {
    showError();
    return;
  }

  currentNumber = String(answer);
  firstNumber = null;
  currentOperator = null;
  waitingForSecondNumber = true;

  updateDisplay();
}
//ressets everything
function clearCalculator() {
  currentNumber = "0";
  firstNumber = null;
  currentOperator = null;
  waitingForSecondNumber = false;

  updateDisplay();
}
//removes the last number from the screen
function removeLastNumber() {
  if (waitingForSecondNumber === true || currentNumber === "Error") {
    return;
  }

  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
  } else {
    currentNumber = "0";
  }

  updateDisplay();
}
//shows error if trying to do an impossible equation
function showError() {
  currentNumber = "Error";
  firstNumber = null;
  currentOperator = null;
  waitingForSecondNumber = true;

  updateDisplay();
}
//makes it so that when a button is clicked it will do the correct action
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    let action = button.dataset.action;
    let value = button.dataset.value;

    if (action === "number") {
      enterNumber(value);
    }

    if (action === "operator") {
      chooseOperator(value);
    }

    if (action === "equals") {
      showAnswer();
    }

    if (action === "clear") {
      clearCalculator();
    }

    if (action === "backspace") {
      removeLastNumber();
    }
  });
});