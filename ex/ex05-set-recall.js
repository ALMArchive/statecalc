"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.e();
calc.setv1();
calc.setv2();

calc.ce();

calc.recv1();
console.log(calc.entry); // e

calc.ce();

console.log(calc.entry); // 0

calc.recv2();
console.log(calc.entry); // e
