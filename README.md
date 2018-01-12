# StateCalc

## About

*StateCalc* is a state based calculator interface that operates how
you would expect a desktop or handled calculator to work. Digits are entered
sequentially and can be processed with a handful of simple math functions.

*StateCalc* was intended to power gui calculators, but it is appropriate for any
sequentially read sets of number or applied functions.

## Main Example

```javascript
"use strict";
const StateCalc = require("../statecalc.js");

let calc = new StateCalc();

calc.addNumber(2);
calc.pw2();

calc.plus();
calc.addNumber(2);
calc.equal();

calc.plus();
calc.addNumber(2);
calc.equal();

console.log(calc.answer); // 8
```

## Implementation Details

### Overview

The interface is very simple and all private data is privately held using a
symbol. However, it's important to note the difference in behavior for certain
functions or states.

To manage internal state functions are split into two types, unary or binary.

### Unary & Binary

The **binary functions** include all the primary arithmetic operations,
`plus (+)`, `minus (-)`, `divide (/)`, `multiply (*)` and additionally the `pct`
function which turns the number into a percent (dividing by 100).

The **unary functions** are `exponential (e^x)`, `power of two (2^x)`,
`power of 10 (10^x)`, `natural log (ln)`, `sin`, `cos`, `tan`, `log of 2`,
`invert (1 / x)`, `square root (√)`, `cubed root (x^(1/3))`, `negate (* -1)`.

The other functions do not contribute to flow of state in the application.

All internal calculations are performed using curied partial functions. The
principle difference between binary and unary operations is unary operations
automatically call the equal function which calculates the result of a set of
operations and stores the result in the answer variable.

Binary functions, in contrast, require an additional operand and a call to the
equal function.

### Equal

The equal function operates similarly to standard desktop calculators, applying 
the curried function repetedly on the prior result on each call to the equal
function.

### Constants

There's also four mathematical constants, `e`, `pi`, `phi`, and `sqrt(2)`
(pythagoean constant). Calling a constant will replace the current entry value.
Random numbers can be generated using the rand function, this also replaces the
current entry value. There's a simple memory system with two variables, `v1` and
`v2`. Each has a set and recall function that pulls from the answer and recalls
to the entry value.

### Clearing

Finally there are clear functions, `C` and `CE`. `CE` clears the current entry
and `C` clears all internal state.

### Properties

There are several read only properties, `entry`, `answer`, `v1`, `v2`, which
gives access to the respective private properties.

## Basic Program Flow

### Entering a Number

After constructing or hard clearing a `StateCalc` you must enter a number before
you can perform any futher operations. You have several choices for how to enter
a number, you can use one of the 4 constants, `e`, `pi`, `phi` or the
pythagorean constant. Additionally, you can generate a random number between 0
and 1.

You can add a number directly using the `addNumber` function.
Numbers are entered sequentially, just like in a desktop calculator. Float
numbers can be entered using the `decimalFunction`, which will only execute once
for any operand preventing the creation of non-numbers.

### Calling Functions

#### Unary Function

After a number is entered, you can use any of the unary functions listed above
and a result will be available on the answer property.

#### Binary Functions

After calling a binary function you must either add another number, or call
`equal`. Calling equal before adding another number will apply the function
to the previous entry. If equal is called after entering a another number then
the function is applied to the current and previous entry. Aftering calling
equal the result will be available on the `answer property`.

## API

### constants

#### e

Eulers constant.

```javascript
calc.e();
console.log(calc.entry); // e
```

#### pi

Ratio of a circle's circumference to it's diameter.

```javascript
calc.pi();
console.log(calc.entry); // pi
```

#### phi


The Holden Ratio

```javascript
calc.phi();
console.log(calc.entry); // phi
```

#### py

The square root of 2, or the pythagorean constant.

```javascript
calc.py();
console.log(calc.entry); // py
```

### addNumber

The add number function takes an interger (will floor floats) and adds it
to the current entry. This was intended to add digits sequentially like a
calculator, but it is possible to enter the entire integer or decimal portion at
once.

For example the following are equivalent:

```javascript
calc.addNumber(100);
calc.addDecimal();
calc.addNumber(123);
console.log(calc.entry) // "100.123"

calc.addNumber(1);
calc.addNumber(0);
calc.addNumber(0);
calc.addDecimal();
calc.addNumber(1);
calc.addNumber(2);
calc.addNumber(3);
console.log(calc.entry) // "100.123"
```

### addDecimal

Adds a decimal to the current entered number, will not allow multiple decimals
to be added to the same number.

```javascript
calc.addNumber(1);
calc.addDecimal();
calc.addNumber(1);
console.log(calc.entry) // 1.1
calc.addNumber(1);
calc.addDecimal();
calc.addNumber(1);
console.log(calc.entry) // 1.11
```
