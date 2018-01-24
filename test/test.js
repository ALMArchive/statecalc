"use strict";

const chai     = require("chai");
const StateCalc = require("../statecalc.js");

function addNumber(num, stateCalc) {
  let digits = num.split("");
  for (const dig of digits) {
    if (dig === ".") {
      stateCalc.addDecimal();
      continue;
    }
    stateCalc.addNumber(dig - 0);
  }
}

const funcs = {
  exp:  Math.exp,
  pw2:  (n) => Math.pow(2, n),
  pw10: (n) => Math.pow(10, n),
  ln:   Math.log,
  sin:  Math.sin,
  cos:  Math.cos,
  tan:  Math.tan,
  sqrt: Math.sqrt,
  qrt:  (n) => Math.pow(n, 1 / 3),
  log:  Math.log2,
  vert: (n) => 1 / n
}

const biFuncs = {
  plus:  (a,b)  => a + b,
  div:   (a, b) => a / b,
  mult:  (a, b) => a * b,
  minus: (a, b) => a - b
}

const numbers = ["0002031000.54000300000", "0059.0", "5.432", "0.540", "2.52", "065450", "9534.643", "12.526", "543.6234", "2342.43", "742.23", "877.623"];

describe("statecalc", function() {
  describe("Tests", function() {
    it("Should equal expect output.", function() {
      let stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      chai.expect(stateCalc.answer).to.be.equal(0);
      chai.expect(stateCalc.v1).to.be.null;
      chai.expect(stateCalc.v2).to.be.null;
    })
    it("addNumber should give correct entry value", function () {
      for(const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        chai.expect(stateCalc.entry).to.equal(num - 0);
      }
    })
    it("addNumber with addDecimal should give correct float numbers", function () {
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        chai.expect(stateCalc.entry).to.equal(num - 0);
      }
    })
    it("check equals works", function () {
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        stateCalc.equal();
        chai.expect(stateCalc.answer).to.equal(num - 0);
      }
    })
    it("check negate works", function () {
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        stateCalc.negate();
        chai.expect(stateCalc.entry).to.equal(-1 * num);
      }
    })
    it("check e works", function () {
      let stateCalc = new StateCalc();
      stateCalc.e();
      chai.expect(stateCalc.answer).to.equal(Math.E);
    })
    it("check pi works", function () {
      let stateCalc = new StateCalc();
      stateCalc.pi();
      chai.expect(stateCalc.answer).to.equal(Math.PI);
    })
    it("check phi works", function () {
      let stateCalc = new StateCalc();
      stateCalc.phi();
      chai.expect(stateCalc.answer).to.equal(1.6180339887498948482);
    })
    it("check py works", function () {
      let stateCalc = new StateCalc();
      stateCalc.py();
      chai.expect(stateCalc.answer).to.equal(Math.sqrt(2));
    })
    it("check functions on constants", function () {
      let stateCalc = new StateCalc();
      stateCalc.py();
      stateCalc.exp();
      chai.expect(stateCalc.answer).to.equal(Math.exp(Math.sqrt(2)));
    })
    it("check pct works", function () {
      let stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      addNumber("2", stateCalc);
      stateCalc.equal();
      stateCalc.pct();
      chai.expect(stateCalc.answer).to.equal(2 / 100);
    })
    it("check multiple equals binary", function () {
      let stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      addNumber("2", stateCalc);
      stateCalc.plus();
      addNumber("2", stateCalc);

      stateCalc.equal();
      chai.expect(stateCalc.answer).to.be.equal(4);

      stateCalc.equal();
      chai.expect(stateCalc.answer).to.be.equal(6);

      stateCalc.equal();
      chai.expect(stateCalc.answer).to.be.equal(8);

      stateCalc.qrt();
      chai.expect(stateCalc.answer).to.be.equal(2);

      stateCalc.exp();
      chai.expect(stateCalc.answer).to.be.equal(Math.exp(2));

      stateCalc.exp();
      chai.expect(stateCalc.answer).to.be.equal(Math.exp(Math.exp(2)));
    })
    it("check pressed unary", function () {
      let stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      addNumber("2", stateCalc);
      stateCalc.equal();
      stateCalc.pw2();

      chai.expect(stateCalc.answer).to.be.equal(4);

      stateCalc.pw2();
      chai.expect(stateCalc.answer).to.be.equal(16);

      stateCalc.pw2();
      chai.expect(stateCalc.answer).to.be.equal(65536);
    })
    it("check recall", function () {
      let stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      addNumber("2", stateCalc);
      stateCalc.func("plus");
      addNumber("2", stateCalc);
      stateCalc.equal();
      chai.expect(stateCalc.answer).to.be.equal(4);
      stateCalc.setv1();
      stateCalc.recv1();
      chai.expect(stateCalc.entry).to.be.equal(4);

      stateCalc = new StateCalc();
      chai.expect(stateCalc.entry).to.be.equal(0);
      addNumber("2", stateCalc);
      stateCalc.func("plus");
      addNumber("2", stateCalc);
      stateCalc.equal();
      chai.expect(stateCalc.answer).to.be.equal(4);
      stateCalc.setv2();
      stateCalc.recv2();
      chai.expect(stateCalc.entry).to.be.equal(4);
    })
    it("check ce works", function () {
      let stateCalc = new StateCalc();
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        chai.expect(stateCalc.entry).to.be.equal(num - 0);
        stateCalc.ce();
        chai.expect(stateCalc.entry).to.be.equal(0);
      }
    })
    it("check rand works", function () {
      let last = -1;
      let stateCalc = new StateCalc();
      for(let x = 0; x < 100; x++) {
        stateCalc.rand();
        stateCalc.equal();
        chai.expect(stateCalc.answer < 1 && stateCalc.answer !== last).to.be.true;
        last = stateCalc.answer;
      }
      stateCalc.py();
      chai.expect(stateCalc.answer).to.equal(Math.sqrt(2));
    })
    it("check unary works", function () {
      for(const func in funcs) {
        for (const num of numbers) {
          let stateCalc = new StateCalc();
          chai.expect(stateCalc.entry).to.be.equal(0);
          addNumber(num, stateCalc);
          chai.expect(stateCalc.entry).to.be.equal(num - 0);
          stateCalc.equal();
          stateCalc.func(func);
          chai.expect(stateCalc.answer).to.equal(funcs[func](num - 0));
        }
      }
    })
    it("check multi stage unary", function () {
      let numbers = ["4", "0059.0", "5.432", "0.540", "2.52", "12.526"];
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        stateCalc.equal();
        stateCalc.func("exp");
        let ans = Math.exp(num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("qrt");
        ans = Math.pow(ans, 1/3);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("tan");
        ans = Math.tan(ans);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("vert");
        ans = 1 / ans;
        chai.expect(stateCalc.answer).to.equal(ans);
      }
    });
    it("check binary works", function () {
      let nums = ["1", "1.5", "2", "3", "5", "10"];
      for(const func in biFuncs) {
        for(const num of numbers) {
          for(const num2 of nums) {
            let stateCalc = new StateCalc();
            addNumber(num, stateCalc);
            chai.expect(stateCalc.entry).to.be.equal(num - 0);
            stateCalc.equal();
            stateCalc.func(func);
            addNumber(num2, stateCalc);
            stateCalc.equal();
            let tmpEqual = biFuncs[func](num - 0, num2 - 0);
            let tmpCalc = stateCalc.answer;
            chai.expect(stateCalc.answer).to.be.equal(tmpEqual);
          }
        }
      }
    })
    it("check multi stage binary", function () {
      for (const num of numbers) {
        let stateCalc = new StateCalc();
        chai.expect(stateCalc.entry).to.be.equal(0);
        addNumber(num, stateCalc);
        stateCalc.func("plus");
        addNumber(num, stateCalc);
        stateCalc.equal();
        let ans = (num - 0) + (num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("plus");
        addNumber(num, stateCalc);
        chai.expect(stateCalc.entry).to.be.equal(num - 0);
        stateCalc.equal();
      
        ans = ans + (num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.minus();
        addNumber(num, stateCalc);
        ans = ans - (num - 0);
        stateCalc.equal();
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.div();
        addNumber(num, stateCalc);
        stateCalc.equal();
        ans = ans / (num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("mult");
        addNumber(num, stateCalc);
        stateCalc.equal();
        ans = ans * (num - 0);

        stateCalc.plus();
        addNumber(num, stateCalc);
        chai.expect(stateCalc.entry).to.be.equal(num - 0);
        stateCalc.equal();

        ans = ans + (num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("minus");
        addNumber(num, stateCalc);
        ans = ans - (num - 0);
        stateCalc.equal();
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("div");
        addNumber(num, stateCalc);
        stateCalc.equal();
        ans = ans / (num - 0);
        chai.expect(stateCalc.answer).to.equal(ans);

        stateCalc.func("mult");
        addNumber(num, stateCalc);
        stateCalc.equal();
        ans = ans * (num - 0);
      }
    });
  })
})
