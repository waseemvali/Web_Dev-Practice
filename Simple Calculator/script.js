class Calculator {
  constructor(previous, current) {
    this.previous = previous;
    this.current = current;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  append(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  selectOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      case "×":
        computation = prev * curr;
        break;
      case "∧":
        computation = Math.pow(prev, curr);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  // split the number into integer and decimal parts and then apply locale string
  displayNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split(".")[0]);
    const decimalPart = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerPart)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerPart.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalPart != null) {
      return `${integerDisplay}.${decimalPart}`;
    } else {
      return integerDisplay;
    }
  }

  refreshDisplay() {
    this.current.innerText = this.displayNumber(this.currentOperand);
    if (this.operation != undefined) {
      this.previous.innerText = `${this.displayNumber(this.previousOperand)} ${
        this.operation
      }`;
    } else {
      this.previous.innerText = this.displayNumber(this.previousOperand);
    }
  }
}

const numbersBtns = document.querySelectorAll(".numbers");
const operationsBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector(".equals");
const allClearBtn = document.querySelector(".allClear");
const deleteBtn = document.querySelector(".delete");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

const calculator = new Calculator(previous, current);

numbersBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.refreshDisplay();
  });
});

operationsBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.refreshDisplay();
  });
});

equalsBtn.addEventListener("click", button => {
  calculator.compute();
  calculator.refreshDisplay();
});

allClearBtn.addEventListener("click", button => {
  calculator.clear();
  calculator.refreshDisplay();
});

deleteBtn.addEventListener("click", button => {
  calculator.delete();
  calculator.refreshDisplay();
});
