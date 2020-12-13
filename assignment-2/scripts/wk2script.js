console.log('script.js')

// button to change background color

let colorChanger = document.getElementById('colorChanger');
colorChanger.onclick = function() {
  let colorArray = ['red', 'blue', 'green', 'cyan', 'orange'];
  document.getElementById('background').style.background = colorArray[Math.floor(Math.random() * 5)];
}

// counter with screen

let counterValue = 0;

document.getElementById('counterUp').onclick = function() {
  counterValue += 1;
  document.getElementById('counterText').innerHTML = counterValue;
}

document.getElementById('counterDown').onclick = function() {
  counterValue -= 1;
  document.getElementById('counterText').innerHTML = counterValue;
}

// quick note: this entire week I had been trying to figure out how to code a calculator
// just straight up coding a calculator was too big of a challenge, so I started
// with a button that changed the color of the page
// next step was to make a counter
// after making the counter, I felt an enhanced sense of accomplishment,
// more than I did when I finished the simple button
// when I completed the counter, I realized that I had figured out how to manipulate
// elements on a page with other elements and javascript,
// a big milestone in my mind

// calculator

let previousInput = [''];
let currentInput = [0];

const integerFunctionality = (num) => {
  if (previousInput[0].indexOf('=') > -1) {
    previousInput = [''];
    currentInput = [0];
    document.getElementById('previousInput').innerHTML = previousInput;
    currentInput.push(num);
    let storedInput = currentInput.join('');
    storedInput = Number(storedInput);
    currentInput = [];
    currentInput.push(storedInput);
    // clears display if a calculation is already present and pushes new input
  } else if (typeof(currentInput[0]) === 'string' && num === 0) {
    currentInput[0] = currentInput[0] + '0';
    // makes sure no zeros disappear
    // zeros would disappear if left after a period
  } else {
    currentInput.push(num);
    let storedInput = currentInput.join('');
    storedInput = Number(storedInput);
    currentInput = [];
    currentInput.push(storedInput);
    // adds a number to the display
  }
  document.getElementById('currentInput').innerHTML = currentInput;
}

const operatorFunctionality = (op) => {
  if (previousInput[0].indexOf('=') > -1) {
    let storedInput = currentInput[0] + ' ' + op;
    previousInput[0] = storedInput;
    currentInput[0] = 0;
    // if you're adding from a calculated equation, reset the screen
  } else if (
    previousInput[0].indexOf('+') > -1 ||
    previousInput[0].indexOf('-') > -1 ||
    previousInput[0].indexOf('*') > -1 ||
    previousInput[0].indexOf('÷') > -1) {
    let storedInput = previousInput[0] + ' ' + currentInput;
    let valueBank;
    previousInput = previousInput[0].split('');
    previousInput.pop();
    previousInput.pop();
    previousInput = previousInput.join('');
    previousInput = Number(previousInput);
    if (storedInput.indexOf('+') > -1) {
      valueBank = previousInput + currentInput[0];
    } else if (storedInput.indexOf('*') > -1) {
      valueBank = previousInput * currentInput[0];
    } else if (storedInput.indexOf('÷') > -1) {
      valueBank = previousInput / currentInput[0];
    } else if (storedInput.indexOf('-') > -1 && storedInput.indexOf('-') != 0) {
      valueBank = previousInput - currentInput[0];
    }
    previousInput = [];
    previousInput[0] = valueBank + ' ' + op;
    currentInput[0] = 0;
    // solves the problem to link equations and multiple operators
  } else {
    previousInput[0] = currentInput[0] + ' ' + op;
    currentInput = [0];
    // converts currentInput into a string and sets previousInput equal to currentInput
  }
  document.getElementById('previousInput').innerHTML = previousInput;
  document.getElementById('currentInput').innerHTML = currentInput;
}

document.getElementById('btnCe').onclick = function() {
  previousInput = [''];
  currentInput = [0];
  document.getElementById('previousInput').innerHTML = previousInput;
  document.getElementById('currentInput').innerHTML = currentInput;
  // resets screen back to beginning
}

document.getElementById('btnDel').onclick = function () {
  let storedInput = currentInput[0].toString();
  storedInput = storedInput.split('');
  if (previousInput[0].indexOf('=') > -1) {
    previousInput = previousInput;
    currentInput = currentInput;
    // stops you from being able to delete the answer
  } else if (currentInput === []){
    currentInput.push(0);
    // if there is no current value (deleted last number), display a 0
  } else if (storedInput[storedInput.length - 2] === '.') {
    storedInput.pop();
    storedInput = storedInput.join('');
    currentInput = [];
    currentInput.push(storedInput);
    // delete the last number
    // if the would be last character is a period, keep value as string
    // had problems with the period disapearing if the value was left as a number
  } else {
    storedInput.pop();
    storedInput = storedInput.join('');
    storedInput = Number(storedInput);
    currentInput = [];
    currentInput.push(storedInput);
    // delete the last number
  }
  document.getElementById('currentInput').innerHTML = currentInput;
}

document.getElementById('btn.').onclick = function() {
  if (currentInput[0].toString().indexOf('.') > -1) {
    currentInput = currentInput;
    // if there is already a period in the value, return the value
  } else {
    currentInput.push('.');
    let storedInput = currentInput.join('');
    currentInput = [];
    currentInput.push(storedInput);
    // adds a period to the display without converting value back to Number
    // as a number value, if there is a period and no number to follow,
    // the period will disappear
  }
  document.getElementById('currentInput').innerHTML = currentInput;
}

document.getElementById('btn=').onclick = function() {
  if (previousInput[0].indexOf('=') > -1) {
    previousInput = previousInput;
    currentInput = currentInput;
    // if the calculation has already been completed, equals button does nothing
  } else {
    let storedInput = previousInput[0] + ' ' + currentInput + ' ' + '=';
    previousInput = previousInput[0].split('');
    previousInput.pop();
    previousInput.pop();
    previousInput = previousInput.join('');
    previousInput = Number(previousInput);
    if (storedInput.indexOf('+') > -1) {
      currentInput[0] = previousInput + currentInput[0];
    } else if (storedInput.indexOf('*') > -1) {
      currentInput[0] = previousInput * currentInput[0];
    } else if (storedInput.indexOf('÷') > -1) {
      currentInput[0] = previousInput / currentInput[0];
    } else if (storedInput.indexOf('-') > -1 && storedInput.indexOf('-') != 1) {
      currentInput[0] = previousInput - currentInput[0];
    }
    previousInput = [''];
    previousInput[0] = storedInput;
    // calculates the equation
  }
  document.getElementById('previousInput').innerHTML = previousInput;
  document.getElementById('currentInput').innerHTML = currentInput;
}

const buttonLoop = () => {
  for (let x = 0 ; x < 10 ; x++) {
    document.getElementById('btn' + x).onclick = function() {
      integerFunctionality(x);
    }
  }
}

buttonLoop();

document.getElementById('btn+').onclick = function() {
  operatorFunctionality('+');
}

document.getElementById('btn-').onclick = function() {
  operatorFunctionality('-');
}

document.getElementById('btn*').onclick = function() {
  operatorFunctionality('*');
}

document.getElementById('btn/').onclick = function() {
  operatorFunctionality('÷');
}
