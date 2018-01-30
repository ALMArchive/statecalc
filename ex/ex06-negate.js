"use strict";

import StateCalc from "../statecalc";

let calc = new StateCalc();

calc.addNumber(1);
console.log(calc.entry) // 1

calc.negate();
console.log(calc.entry) // -1

calc.negate();
console.log(calc.entry) // 1
