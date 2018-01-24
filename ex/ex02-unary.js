"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.addNumber(2);
calc.equal();
calc.pw2();
console.log(calc.answer) // 4

calc.pw2();
console.log(calc.answer); // 16

calc.sqrt();
console.log(calc.answer); // 4

calc.sqrt(); // repeat
console.log(calc.answer); // 2
