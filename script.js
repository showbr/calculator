/*

todo:
add keyboard compatibility
add erase function
truncate exceeding numbers

*/


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR!";
    }
    return a / b;
}

function operate(a, b, operation) {
    if (operation === "+") return add(a, b);
    if (operation === "-") return subtract(a, b);
    if (operation === "x") return multiply(a, b);
    if (operation === "/") return divide(a, b);
}

function clearResult() {
    resultBox.textContent = "0";
}

function resetNumbers() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function printOperation() {
    operationBox.textContent = "";
    operationBox.textContent = `${firstNumber} ${operator} ${secondNumber}`;
}

let firstNumber = "";
let secondNumber = "";
let operator = "";

const operationBox = document.querySelector(".operation");
const resultBox = document.querySelector(".result");

// clear button logic
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    operationBox.textContent = "";
    clearResult();
    resetNumbers();
}); 

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e) => {

    // checks if its pressing the buttons, not the background
    if (buttons !== e.target) {
        
        const buttonPressed = e.target.textContent;
        const numberPressed = +e.target.textContent;

        if (firstNumber === "ERROR!") {
            resetNumbers();
        }

        // checks if it has no operator yet, and gets the first number
        if (!operator) {
            if (!isNaN(numberPressed)) {
                firstNumber += numberPressed;
            }
            else if (buttonPressed === ".") {
                if (!firstNumber) {
                    firstNumber += "0" + buttonPressed;
                }
                else if (!firstNumber.includes(".")) {
                    firstNumber += buttonPressed;
                }
            }
        }

        // checks if it has a first number but no second number, and allows it to get an operator
        // or to print directly to the screen
        if (firstNumber && !secondNumber) {
            if (isNaN(numberPressed) && buttonPressed !== "=" && buttonPressed != ".") {
                operator = buttonPressed;
            }
            else if (buttonPressed === "=") {
                resultBox.textContent = firstNumber;
            }
        }

        // checks if it has already an operator, and gets the second number
        if (operator) {
            if (!isNaN(numberPressed)) {
                secondNumber += numberPressed;
            }
            else if (buttonPressed === ".") {
                if (!secondNumber) {
                    secondNumber += "0" + buttonPressed;
                }
                else if (!secondNumber.includes(".")) {
                    secondNumber += buttonPressed;
                }
            }
        }

        printOperation();

        // if the first number and second number are already typed, allows it to print the result to the screen
        if (firstNumber && secondNumber) {
            if (isNaN(numberPressed) && buttonPressed != ".") {
                const result = operate(Number(firstNumber), Number(secondNumber), operator);

                // the original expression remains in the screen
                if (buttonPressed === "=") {
                    resultBox.textContent = result;
                    resetNumbers();
                    firstNumber = String(result);
                }
                // continues directly the expression
                else {
                    clearResult();
                    resetNumbers();
                    resultBox.textContent = result;
                    firstNumber = String(result);
                    operator = buttonPressed;
                    printOperation();
                }
            }
        }
        
    }
});

const changeSignalButton = document.querySelector("#plus-or-minus");

changeSignalButton.addEventListener("click", () => {
    if (!firstNumber) {
        firstNumber = "-";
    }
    else if (firstNumber === "-") {
        firstNumber = "";
    }
    else if (!operator) {
        firstNumber = String(-Number(firstNumber));
    }
    else if (!secondNumber) {
        secondNumber = "-";
    }
    else if (secondNumber === "-") {
        secondNumber = "";
    }
    else {
        secondNumber = String(-Number(secondNumber));
    }

    printOperation();
}); 