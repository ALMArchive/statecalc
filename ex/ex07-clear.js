"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.addNumber(1);
calc.equal();

console.log(calc.entry); // 1
console.log(calc.answer); // 1

calc.ce();
console.log(calc.entry); // 0
console.log(calc.answer); // 1

calc.c();
console.log(calc.entry); // 0
console.log(calc.answer); // 0
