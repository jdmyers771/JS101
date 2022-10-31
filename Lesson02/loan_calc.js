
const READLINE = require('readline-sync');
const MESSAGES = require('./loan_calc_config.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function getLoanAmount(message, error) {
  prompt(message);
  let input = READLINE.question();
  while (invalidNumber(input) || Number(input) <= 0) {
    prompt(error);
    input = READLINE.question();
  }
  return Number(input);
}

function getLoanDuration(message, error) {
  prompt(message);
  let input = READLINE.question();
  while (invalidNumber(input) || Number(input) < 0 ||
    !Number.isInteger(Number(input))) {
    prompt(error);
    input = READLINE.question();
  }
  return Number(input);
}

function getLoanApr(message, error) {
  prompt(message);
  let input = READLINE.question();
  while (invalidNumber(input) || Number(input) < 0) {
    prompt(error);
    input = READLINE.question();
  }
  return Number.parseFloat(input);
}

// Create number formatter for output
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Welcome
prompt(MESSAGES.welcome);

// Get Loan Amount from User
let loanAmount =
  getLoanAmount(MESSAGES.loan_amount, MESSAGES.loan_amount_error);

// Get Loan Duration from User and calculate total
// loan duration in months (loanDurationMonths).
let loanYears =
  getLoanDuration(MESSAGES.loan_years, MESSAGES.loan_years_error);
let loanMonths =
  getLoanDuration(MESSAGES.loan_months, MESSAGES.loan_months_error);

let loanDurationMonths = (loanYears * 12) + loanMonths;

while (loanDurationMonths === 0) {
  prompt(MESSAGES.loan_duration_error);
  loanYears =
    getLoanDuration(MESSAGES.loan_years, MESSAGES.loan_years_error);
  loanMonths =
    getLoanDuration(MESSAGES.loan_months, MESSAGES.loan_months_error);
  loanDurationMonths = (loanYears * 12) + loanMonths;
}

// Get Loan APR from User and calculate monthly interest rate.
let loanAPR = getLoanApr(MESSAGES.loan_apr, MESSAGES.loan_apr_error);
let monthlyRate = loanAPR / 100 / 12;

// Calculate Monthly Payment
let monthlyPayment;
if (monthlyRate === 0) {
  monthlyPayment = loanAmount / loanDurationMonths;
} else {
  monthlyPayment = loanAmount *
    (monthlyRate / (1 - Math.pow((1 + monthlyRate), (-loanDurationMonths))));
}

// Output Monthly Payment to Console
console.log(formatter.format(monthlyPayment));
