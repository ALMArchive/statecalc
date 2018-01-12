"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.e();
console.log(calc.entry) // e

calc.pi();
console.log(calc.entry) // pi

calc.py();
console.log(calc.entry) // py

calc.phi();
console.log(calc.entry) // phi
