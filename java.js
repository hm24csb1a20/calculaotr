document.addEventListener("DOMContentLoaded", function () {
    const inputScreen = document.querySelector(".input");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let shouldResetScreen = false;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.value;

            if (button.classList.contains("all-clear")) {
                clearScreen();
                return;
            }

            if (button.classList.contains("operator")) {
                handleOperator(value);
                return;
            }

            if (value === "equal") {
                calculateResult();
                return;
            }

            appendNumber(value);
        });
    });

    function clearScreen() {
        currentInput = "";
        operator = "";
        firstOperand = "";
        inputScreen.value = "0";
    }

    function handleOperator(op) {
        if (currentInput === "") return;
        if (firstOperand !== "") {
            calculateResult();
        }
        operator = op;
        firstOperand = currentInput;
        shouldResetScreen = true;
    }

    function calculateResult() {
        if (operator === "" || firstOperand === "") return;
        let result;
        const secondOperand = currentInput;

        switch (operator) {
            case "+":
                result = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case "-":
                result = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case "*":
                result = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case "/":
                result = parseFloat(secondOperand) !== 0 ? parseFloat(firstOperand) / parseFloat(secondOperand) : "Error";
                break;
            default:
                return;
        }

        inputScreen.value = result;
        currentInput = result.toString();
        operator = "";
        firstOperand = "";
    }

    function appendNumber(number) {
        if (shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === "0" ? number : currentInput + number;
        }
        inputScreen.value = currentInput;
    }
});
