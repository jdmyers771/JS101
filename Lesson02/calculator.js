// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(MESSAGES.welcome);

while (true) {
  prompt(MESSAGES.first_num);
  let firstNumber = readline.question();

  while (invalidNumber(firstNumber)) {
    prompt(MESSAGES.invalid_num);
    firstNumber = readline.question();
  }

  prompt(MESSAGES.second_num);
  let secondNumber = readline.question();

  while (invalidNumber(secondNumber)) {
    prompt(MESSAGES.invalid_num);
    secondNumber = readline.question();
  }

  prompt(MESSAGES.operation);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES.invalid_operation);
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

  prompt(MESSAGES.repeat);
  let repeat = readline.question();

  while (!['1', '2'].includes(repeat)) {
    prompt(MESSAGES.invalid_repeat);
    repeat = readline.question();
  }

  if (repeat === '2') {
    prompt(MESSAGES.end);
    break;
  }
}