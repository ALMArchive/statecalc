"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.addNumber(2);
calc.plus();
calc.addNumber(3);
calc.equal();
console.log(calc.answer) // 5

calc.addNumber(1);
calc.minus();
calc.equal();
console.log(calc.answer); // 4

calc.sqrt();
console.log(calc.answer); // 2

calc.equal(); // repeat last action
console.log(calc.answer); // sqrt(2)
