/*

todo:
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

const operations = {
    "+": add,
    "-": subtract,
    "x": multiply,
    "/": divide
};

function operate(a, b, operation) {
    return operations[operation](a, b);
}

// handle numbers and dots logic
function insertNumber(number, digit) {
    if (digit === ".") {
        if (number) {
            return number.includes(digit) ? number : number + digit;
        }
        return "0."
    }
    return number + digit;
}

function clearResultBox() {
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

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (e) => {

    if (buttons !== e.target) {
        
        const buttonPressed = e.target.textContent;
        const numberPressed = +e.target.textContent;

        if (firstNumber === "ERROR!") {
            resetNumbers();
        }

        // if there is no operator and a number or dot was pressed, inserts the first number
        if (!operator && (!isNaN(numberPressed) || buttonPressed === ".")) {
            firstNumber = insertNumber(firstNumber, buttonPressed);
        }

        // if there is a first number, awaits for a operator or the = button
        if (firstNumber && !secondNumber) {
            if (isNaN(numberPressed) && buttonPressed !== "=" && buttonPressed !== ".") {
                operator = buttonPressed;
            }
            else if (buttonPressed === "=") {
                operator = "";
                resultBox.textContent = firstNumber;
            }
        }

        // if there is a operator and a number or dot was pressed, inserts the second number
        if (operator && (!isNaN(numberPressed) || buttonPressed === ".")) {
            secondNumber = insertNumber(secondNumber, buttonPressed);
        }

        printOperation();

        // if there are both numbers, awaits for a operator or = to be pressed
        if (firstNumber && secondNumber && isNaN(numberPressed) && buttonPressed != ".") {
            const result = operate(Number(firstNumber), Number(secondNumber), operator);

            if (buttonPressed === "=") {
                resultBox.textContent = result;
                resetNumbers();
                firstNumber = String(result);
            }
            else {
                clearResultBox();
                resetNumbers();
                resultBox.textContent = result;
                if (result !== "ERROR!") {
                    firstNumber = String(result);
                    operator = buttonPressed;
                    printOperation();
                }
            }
        }
    }
});


const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    operationBox.textContent = "";
    clearResultBox();
    resetNumbers();
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


const eraseButton = document.querySelector(".erase");
eraseButton.addEventListener("click", () => {
    if (firstNumber && !secondNumber && !operator) {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    }
    else if (operator && !secondNumber) {
        operator = "";
    }
    else if (firstNumber && secondNumber) {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    }

    printOperation();
});


const numbers = "0123456789";
const operators = "x+-/="

document.addEventListener("keydown", (e) => {

    if (firstNumber === "ERROR!") {
        resetNumbers();
    }

    let keyPressed = e.key;
    if (keyPressed === "*") keyPressed = "x";
    if (keyPressed === "Enter") keyPressed = "=";

    if (keyPressed === "Backspace") {
        if (firstNumber && !secondNumber && !operator) {
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        }
        else if (operator && !secondNumber) {
            operator = "";
        }
        else if (firstNumber && secondNumber) {
            secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        }
    }

    // if there is no operator, registers keyboard input to the first number
    if (!operator && (keyPressed === "." || numbers.includes(keyPressed))) {
        firstNumber = insertNumber(firstNumber, keyPressed);
    }

    // checks if there is a first number, no second number, and an operator was pressed
    if (firstNumber && operators.includes(keyPressed) && !secondNumber) {
        if (keyPressed === "=") {
            operator = "";
            resultBox.textContent = firstNumber;
        }
        else {
            operator = keyPressed;
        }
    }

    // if there is a operator and a first number, registers keyboard input to the second number
    if (firstNumber && operator && (keyPressed === "." || numbers.includes(keyPressed))) {
        secondNumber = insertNumber(secondNumber, keyPressed);
    }

    printOperation();

    // if there is a first and second numbers, a operator, and a operator or equals key was pressed, prints the result
    if (firstNumber && operator && secondNumber && operators.includes(keyPressed)) {
        const result = operate(Number(firstNumber), Number(secondNumber), operator);
        
        if (keyPressed === "=") {
            resultBox.textContent = result;
            resetNumbers();
            firstNumber = String(result);
        }
        else {
            clearResultBox();
            resetNumbers();
            resultBox.textContent = result;
            if (result !== "ERROR!") {
                firstNumber = String(result);
                operator = keyPressed;
                printOperation();
            }
        }
    } 
    
});