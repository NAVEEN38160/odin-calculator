const display = document.querySelector(".display");
const cells = document.querySelectorAll(".cell");

let operandOne = "";
let operandTwo = "";
let operator = "";

const clearAll = () => {
  updateDisplay("");
  operandOne = "";
  operandTwo = "";
  operator = "";
};

const hasOperator = () => !!operator;
const validExpression = () => operandOne && operandTwo && operator;

const updateDisplay = (content) => {
  display.textContent = content;
};

const calculate = (one, two, symbol, nextOperator = "") => {
  const a = +one;
  const b = +two;
  let result = 0;
  switch (symbol) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        alert("Are you for real? Not allowed to divide by 0!!!");
        clearAll();
        return;
      }
      result = a / b;
      break;
  }
  operandOne = String(result);
  operandTwo = "";
  operator = nextOperator;
  updateDisplay(operandOne);
};

const handleCellClick = (event) => {
  const value = event.target.textContent;
  if (+value || value === "0") {
    if (!hasOperator()) {
      operandOne += value;
      updateDisplay(operandOne);
    } else {
      operandTwo += value;
      updateDisplay(operandTwo);
    }
  } else if (value === "C") {
    clearAll();
  } else {
    if (!operandOne) {
      updateDisplay("enter operand first :/");
    } else {
      if (value !== "=" && validExpression()) {
        calculate(operandOne, operandTwo, operator, value);
      } else if (value === "=" && validExpression()) {
        calculate(operandOne, operandTwo, operator);
      } else {
        operator = value;
      }
    }
  }
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
