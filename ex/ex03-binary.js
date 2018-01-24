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

calc.sin();
console.log(calc.answer); // 0.7568024953079282

calc.pw2(); // repeat minus
console.log(calc.answer); // 1.6897414276920388
