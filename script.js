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

buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.className = 'calc-button';
    buttonsContainer.appendChild(button);
});

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