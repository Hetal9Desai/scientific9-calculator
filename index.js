document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".screen");
  let expression = "";

  document.querySelectorAll(".btn-calc").forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "C") {
        expression = ""; // Reset
      } else if (value === "⌫") {
        expression = expression.slice(0, -1); // Remove last character
      } else if (value === "=") {
        try {
          expression = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
        } catch (error) {
          expression = "Error";
        }
      } else if (value === "+") {
        expression += "+";
      } else if (value === "−") {
        expression += "-";
      } else if (value === "÷") {
        expression += "/";
      } else if (value === "×") {
        expression += "*";
      } else if (value === "+/-") {
        expression = eval(expression) * -1;
      } else {
        expression += value;
      }

      screen.textContent = expression;
    });
  });
});
