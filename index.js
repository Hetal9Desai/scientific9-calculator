// Prototype for Basic Operations
function Operations() {}
Operations.prototype.add = function (a, b) {
  return a + b;
};
Operations.prototype.subtract = function (a, b) {
  return a - b;
};
Operations.prototype.multiply = function (a, b) {
  return a * b;
};
Operations.prototype.divide = function (a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};
Operations.prototype.modulo = function (a, b) {
  return a % b;
};
Operations.prototype.power = function (a, b) {
  return Math.pow(a, b);
};

class Calculator extends Operations {
  constructor() {
    super();
    this.currentValue = "0";
    this.previousValue = "";
    this.operation = "";
    this.displayValue = "";
    this.isExponent = false;
    this.openParenthesesCount = 0;
    this.memoryValue = 0;
    this.isDegreeMode = false;
    this.isScientificNotation = false;
    this.isSecondFunction = false;
  }

  updateScreen() {
    document.querySelector(".screen").textContent = this.displayValue || "0";
  }

  appendNumber(number) {
    if (this.currentValue === "0" || this.isExponent) {
      this.currentValue = number;
      this.isExponent = false;
    } else {
      this.currentValue += number;
    }
    this.displayValue += number;
    this.updateScreen();
  }

  clear() {
    this.currentValue = "0";
    this.previousValue = "";
    this.operation = "";
    this.displayValue = "";
    this.updateScreen();
  }

  backspace() {
    this.currentValue = this.currentValue.slice(0, -1) || "0";
    this.displayValue = this.displayValue.slice(0, -1);
    this.updateScreen();
  }

  operate() {
    if (!this.operation) return;
    const num1 = parseFloat(this.previousValue);
    const num2 = parseFloat(this.currentValue);
    let result;
    try {
      switch (this.operation) {
        case "+":
          result = this.add(num1, num2);
          break;
        case "-":
          result = this.subtract(num1, num2);
          break;
        case "*":
          result = this.multiply(num1, num2);
          break;
        case "/":
          result = this.divide(num1, num2);
          break;
        case "%":
          result = this.modulo(num1, num2);
          break;
        case "^":
          result = this.power(num1, num2);
          break;
        default:
          return;
      }
    } catch (err) {
      result = "Error";
    }
    const entry = `${this.previousValue} ${this.operation} ${this.currentValue} = ${result}`;
    this.currentValue = result.toString();
    this.displayValue = this.currentValue;
    this.previousValue = "";
    this.operation = "";
    this.updateScreen();
  }

  setOperation(op) {
    const operationsMap = {
      add: "+",
      minus: "-",
      multiply: "*",
      divide: "/",
      mod: "%",
    };
    if (this.previousValue !== "" && this.operation) {
      this.operation = operationsMap[op] || "";
      this.displayValue += ` ${this.operation} `;
    } else {
      if (this.displayValue.length > 0 && !this.displayValue.endsWith(" ")) {
        this.operation = operationsMap[op] || "";
        this.previousValue = this.currentValue;
        this.currentValue = "0";
        this.displayValue += ` ${this.operation} `;
      }
    }
    this.updateScreen();
  }

  decimal() {
    if (!this.currentValue.includes(".")) {
      this.currentValue += ".";
      this.displayValue += ".";
      this.updateScreen();
    }
  }

  plusMinus() {
    this.currentValue = (parseFloat(this.currentValue) * -1).toString();
    this.displayValue = this.displayValue.replace(
      /-?[\d.]+$/,
      this.currentValue
    );
    this.updateScreen();
  }
  // Advanced operations
  square() {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = (val * val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
  }
  squareRoot() {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val < 0 ? "Error" : Math.sqrt(val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
  }
  inverse() {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val === 0 ? "Error" : (1 / val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
  }
  absolute() {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = Math.abs(val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
  }
}

// Create a Calculator instance
const calculator = new Calculator();

// Adding event listeners to buttons
document.querySelectorAll(".btn-calc").forEach((button) => {
  button.addEventListener("click", function (event) {
    const action = event.currentTarget.getAttribute("data-action");

    if (!isNaN(action)) {
      calculator.appendNumber(action);
    } else {
      const actionsMap = {
        clear: () => calculator.clear(),
        backspace: () => calculator.backspace(),
        equals: () => calculator.operate(),
        decimal: () => calculator.decimal(),
        "plus-minus": () => calculator.plusMinus(),
        square: () => calculator.square(),
        sqrt: () => calculator.squareRoot(),
        inverse: () => calculator.inverse(),
        absolute: () => calculator.absolute(),
        add: () => calculator.setOperation("add"),
        minus: () => calculator.setOperation("minus"),
        multiply: () => calculator.setOperation("multiply"),
        divide: () => calculator.setOperation("divide"),
        mod: () => calculator.setOperation("mod"),
      };

      if (actionsMap[action]) {
        actionsMap[action]();
      }
    }
  });
});
