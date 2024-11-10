let num1;
let num2;
let operator;

const buttonsContainer = document.getElementById('buttons-container');
const buttons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','=','+',
    'C' //Clear button
];

const display = document.getElementById('display');
display.textContent = '';

buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.className = 'calc-button';
    button.addEventListener('click', () => handleButtonClick(btn));
    buttonsContainer.appendChild(button);
});

function handleButtonClick(value) {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const operators = ['+', '-', '*', '/'];
    const MAX_DIGITS = 12;

    // Helper function to update display
    function updateDisplay() {
        let expression = num1 || '';
        if (operator) expression += ' ' + operator + ' ';
        if (num2) expression += num2;
        display.textContent = expression || '0';
    }

    if (numbers.includes(value)) {
        // Handle decimal point
        if (value === '.') {
            if (operator) {
                if (!num2) num2 = '0';
                if (!num2.includes('.')) num2 += '.';
            } else {
                if (!num1) num1 = '0';
                if (!num1.includes('.')) num1 += '.';
            }
        }
        // Handle numbers
        else if (operator) {
            if (!num2) num2 = '';
            if (num2.length < MAX_DIGITS) {
                if (num2 === '0' && value !== '.') {
                    num2 = value;
                } else {
                    num2 += value;
                }
            }
        } else {
            if (!num1) num1 = '';
            if (num1.length < MAX_DIGITS) {
                if (num1 === '0' && value !== '.') {
                    num1 = value;
                } else {
                    num1 += value;
                }
            }
        }
        updateDisplay();
    } 
    else if (operators.includes(value)) {
        if (num1 && num2 && operator) {
            num1 = operate(Number(num1), Number(num2), operator).toString();
            num2 = '';
        }
        operator = value;
        updateDisplay();
    }
    else if (value === '=') {
        if (num1 && num2 && operator) {
            if (operator === '/' && num2 === '0') {
                display.textContent = 'Error: Division by zero';
                num1 = '';
                num2 = '';
                operator = null;
                return;
            }

            const result = operate(Number(num1), Number(num2), operator);
            const formattedResult = Number.isInteger(result) 
                ? result.toString() 
                : result.toFixed(4).replace(/\.?0+$/, '');
            
            if (formattedResult.length > MAX_DIGITS) {
                display.textContent = 'Overflow';
                num1 = '';
            } else {
                display.textContent = formattedResult;
                num1 = formattedResult;
            }
            num2 = '';
            operator = null;
        }
    }
    else if (value === 'C') {
        num1 = '';
        num2 = '';
        operator = null;
        updateDisplay();
    }
}

function add (num1, num2){
    return (num1 + num2);
};

function subtract (num1, num2) {
    return (num1 - num2);
};

function multiply (num1, num2){
    return (num1 * num2);
};

function divide (num1, num2) {
    return (num1 / num2);
};

function operate(num1, num2, operator){
    switch(operator){
        case '+':
            return add(num1,num2);
        case '-':
            return subtract(num1,num2);
        case '*':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2);
    }
}