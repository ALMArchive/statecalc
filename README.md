# StateCalc

## About

**StateCalc** is a state based calculator interface that operates how
you would expect a desktop or handled calculator to work. Digits are entered
sequentially and can be processed with a handful of simple math functions.

**StateCalc** was intended to power gui calculators, but it is appropriate for any
sequentially read sets of number or applied functions.

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

After constructing or hard clearing a `StateCalc` you must enter a number before
you can perform any futher operations. You have several choices for how to enter
a number, you can use one of the 4 constants, `e`, `pi`, `phi` or the
pythagorean constant. Additionally, you can generate a random number between 0
and 1.

You can add a number directly using the `addNumber` function.
Numbers are entered sequentially, just like in a desktop calculator. Float
numbers can be entered using the `decimalFunction`, which will only execute once
for any operand preventing the creation of non-numbers.

After a number is entered, you can use any of the unary functions listed above
and a result will be available on the answer property.


