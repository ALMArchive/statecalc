"use strict"

const CLASS_SYMBOL = Symbol("StateCalc Symbol");

const ourFuncs = {
  exp: { func: Math.exp, type: "u" },
  pw2: { func: (n) => Math.pow(2, n), type: "u" },
  pw10: { func: (n) => Math.pow(10, n), type: "u" },
  ln: { func: Math.log, type: "u" },
  sin: { func: Math.sin, type: "u" },
  cos: { func: Math.cos, type: "u" },
  tan: { func: Math.tan, type: "u" },
  sqrt: { func: Math.sqrt, type: "u" },
  qrt: { func: (n) => Math.pow(n, 1 / 3), type: "u" },
  log: { func: Math.log2, type: "u" },
  vert: { func: (n) => 1 / n, type: "u" },
  plus: { func: (a, b) => a + b, type: "b" },
  minus: { func: (a, b) => a - b, type: "b" },
  div: { func: (a, b) => a / b, type: "b" },
  mult: { func: (a, b) => a * b, type: "b" },
}

class StateCalc {
  constructor() {
    this[CLASS_SYMBOL] = {
      entry: "0",
      answer: 0,
      numberEntered: false,
      decimalAdded: false,
      answerFunction: null,
      binOp: false,
      eqLast: false,
      error: false,
      v1: null,
      v2: null
    };

    // Add methods to object
    for(const func in ourFuncs) {
      this[func] = () => this.func(func);
    }

    this[CLASS_SYMBOL].unaryOperation = () => {
      if (!this[CLASS_SYMBOL].numberEntered) return;
      this.equal();
      this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].answer + "";
    }

    this[CLASS_SYMBOL].binaryOperation = (func) => {
      if (!this[CLASS_SYMBOL].numberEntered) return;
      this[CLASS_SYMBOL].eqLast = false;
      let fn = this[CLASS_SYMBOL].answerFunction;
      let num;
      if (this[CLASS_SYMBOL].answer) {
        num = this[CLASS_SYMBOL].answer - 0;
      } else {
        num = this[CLASS_SYMBOL].entry - 0;
        this[CLASS_SYMBOL].answer = num;
      }
      let tmpFunc = (n) => fn(num, n);
      this[CLASS_SYMBOL].answerFunction = tmpFunc;
      this[CLASS_SYMBOL].binOp = true;
    }
  }

  get entry() {
    return this[CLASS_SYMBOL].entry - 0;
  }

  set entry(e) {
    return this[CLASS_SYMBOL].entry - 0;
  }

  get answer() {
    return this[CLASS_SYMBOL].answer;
  }

  set answer(e) {
    return this[CLASS_SYMBOL].answer;
  }

  get v1() {
    return this[CLASS_SYMBOL].v1;
  }

  set v1(e) {
    return this[CLASS_SYMBOL].v1;
  }

  get v2() {
    return this[CLASS_SYMBOL].v2;
  }

  set v2(e) {
    return this[CLASS_SYMBOL].v2;
  }

  invert() {
    let val = this[CLASS_SYMBOL].entry - 0;
    this[CLASS_SYMBOL].entry = (-1 * val) + "";
  }

  e() {
    this[CLASS_SYMBOL].numberEntered = true;
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = Math.E + "";
  }

  pi() {
    this[CLASS_SYMBOL].numberEntered = true;
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = Math.PI + "";
  }

  phi() {
    this[CLASS_SYMBOL].numberEntered = true;
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = 1.6180339887498948482 + "";
  }

  py() {
    this[CLASS_SYMBOL].numberEntered = true;
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = Math.sqrt(2) + "";
  }

  pct() {
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = ((this[CLASS_SYMBOL].entry - 0) / 100) + "";
  }

  rand() {
    this[CLASS_SYMBOL].numberEntered = true;
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = Math.random() + "";
  }

  ce() {
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = "0";
  }

  setv1() {
    this[CLASS_SYMBOL].v1 = this[CLASS_SYMBOL].answer;
  }

  setv2() {
    this[CLASS_SYMBOL].v2 = this[CLASS_SYMBOL].answer;
  }

  recv1() {
    this[CLASS_SYMBOL].eqLast = false;
    if(this[CLASS_SYMBOL].v1) {
      this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].v1 - 0;
    }
  }

  recv2() {
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].v2) {
      this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].v2 - 0;
    }
  }

  c() {
    this[CLASS_SYMBOL].entry = {
      entry: "0",
      answer: 0,
      storedValue: null,
      numberEntered: false,
      decimalAdded: false,
      answerFunction: null,
      binOp: false,
      eqLast: false,
      error: false,
      v1: null,
      v2: null
    }
  };

  addNumber(num) {
    if (Math.floor(num) === NaN) return;
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].binOp) {
      this[CLASS_SYMBOL].binOp = false;
      this[CLASS_SYMBOL].entry = "";
      this[CLASS_SYMBOL].decimalAdded = false;
    }
    let numStr = (this[CLASS_SYMBOL].entry || "") + "";
    numStr += Math.floor(num);
    this[CLASS_SYMBOL].entry = numStr;
    this[CLASS_SYMBOL].numberEntered = true;
  }

  addDecimal() {
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].decimalAdded) return;
    this[CLASS_SYMBOL].entry += ".";
    this[CLASS_SYMBOL].numberEntered = false;
    this[CLASS_SYMBOL].decimalAdded = true;
  }

  equal() {
    if (!this[CLASS_SYMBOL].numberEntered) return;
    if (!this[CLASS_SYMBOL].answerFunction) {
      this[CLASS_SYMBOL].answer = this[CLASS_SYMBOL].entry - 0;
    } else {
      let ans;
      if (this[CLASS_SYMBOL].eqLast) {
        ans = this[CLASS_SYMBOL].answerFunction(this[CLASS_SYMBOL].answer - 0);
      } else {
        this[CLASS_SYMBOL].eqLast = true;
        ans = this[CLASS_SYMBOL].answerFunction(this[CLASS_SYMBOL].entry - 0);
      }
      if ((ans - 0) === NaN) {
        this[CLASS_SYMBOL].error = true;
        this[CLASS_SYMBOL].answer = null;
      } else {
        this[CLASS_SYMBOL].error = false;
        this[CLASS_SYMBOL].answer = ans;
      }
    }
  }

  func(func) {
    if (ourFuncs[func]) {
      this[CLASS_SYMBOL].answerFunction = ourFuncs[func].func;
      if (ourFuncs[func].type === "u") {
        this[CLASS_SYMBOL].unaryOperation();
      } else if (ourFuncs[func].type === "b") {
        this[CLASS_SYMBOL].binaryOperation();
      }
    }
  }
}

module.exports = StateCalc;
