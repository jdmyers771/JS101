// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt('Welcome to Calculator!');

prompt("What's the first number?");
let firstNumber = readline.question();

while (invalidNumber(firstNumber)) {
  prompt("Hmm... that doesn't look like a valid number.");
  firstNumber = readline.question();
}

prompt("What's the second number?");
let secondNumber = readline.question();

while (invalidNumber(secondNumber)) {
  prompt("Hmm... that doesn't look like a valid number.");
  secondNumber = readline.question();
}

prompt('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt('Must choose 1, 2, 3 or 4');
  operation = readline.question();
}

let result;
switch (operation) {
  case '1':
    result = firstNumber + secondNumber;
    break;
  case '2':
    result = firstNumber - secondNumber;
    break;
  case '3':
    result = firstNumber * secondNumber;
    break;
  case '4':
    result = firstNumber / secondNumber;
    break;
}

prompt(`The result is: ${result}`);
