---
title: Chapter 1
---
# 1 Algebraic Methods
## 1.1 Algebraic Fractions
To multiply or divide algebraic fractions we always start by factorising where possible.
#### Example 1.1

Simplify: 

$$
\frac {x +1} 2 * \frac {3} {x^2 -1}
$$

#### Solution 1

$$
\frac {x +1} 2 * \frac {3} {x^2 -1} = \frac {x +1} 2 * \frac {3} {(x-1)(x+1)} = \frac {3} {2(x-1)}
$$

## 1.2 Partial Fractions 
Sometimes it is useful to take one fraction and split it into two parts (called *partial fractions*)

#### Example 1.3
Split the following into partial fractions:

$$
\frac {3x-19} {(x+2)(x-3)}
$$
#### Solution 1.3

$$
\frac {3x-19} {(x+2)(x-3)} = \frac A {x+2} + \frac B {x-3}
$$
Where $A(x-3) + B(x+2) \equiv 3x-19$

$$
x=3 => 5B = -10 => B=-2
$$

$$
x=-2 => -5A = -25 => A=5
$$

$$
\therefore \frac {3x-19} {(x+2)(x-3)} = \frac 5 {x+2} - \frac 2 {x-3}
$$

When we have fractions with more than two linear factors in the denominator, we deal with them in the same way. For example, to write $\frac {6x^2 + 5x -2} {x(x-1)(2x+1)}$ as partial fractions we set it equal to $\frac A x + \frac B {x-1} + \frac C {2x+1}$ and proceed the same way. However we need to be careful when we have repeated factors in the denominator.

#### Example 1.4
Write the following as partial fractions:

$$
\frac {11x^2 + 14x +5} {(x+1)^2(2x+1)}
$$
#### Solution 1.4
$$
\frac {11x^2 + 14x +5} {(x+1)^2(2x+1)} = \frac A {(x+1)^2} + \frac B {(x+1)} + \frac C {(2x+2)}
$$

Where $A(2x+1) + B(x+1)(2x+1) + C(x+1)^2 = 11x^2 + 14x + 15$


$$
x = -1 => A = -2
$$


$$
x = -\frac 1 2 => C = 3
$$

Compare coefficients: 
$$
2B + C = 1
$$

$$
2B = 8
$$

$$
B = 4
$$

If we start off with an improper fraction, we can use division of polynomials (divide the top line by the bottom) to turn it into a polynomial + partial fractions.

#### Example 1.5
Express the following as an improper fraction

$$
\frac {4x^2 -5x -3} {(x-2)(x+1)}
$$
#### Solution 1.5
$$
\frac {4x^2 -5x -3} {(x-2)(x+1)}= \frac {4(x^2 -x -2) -x + 5} { x^2 -x -2}= 4 + \frac {5-x} {(x-2)(x+1)}
$$

And from there it can be solved by the methods outlined above.

## 1.3 Proof by contradiction

To prove something by contradiction, we start by making the assumption that it is NOT true. We then proceed logically from this assumption to look to get to something that doesn't make sense, telling us that what we assumed was wrong and so the statement must in fact be true.

#### Example 1.6
Prove that if $n^2$ is even then $n$ is even.

#### Solution 1.6
Assumption: There exists a number n such that $n^2$ is even but $n$ is odd.
$n$ is odd so $n=2k+1$
$\therefore n^2 = (2k+1)^2 = 4k^2 + 4k +1 = 2(2k^2 + 2k) +1$
So $n^2$ is odd.
This contradicts the assumption that $n^2$ is even.
Therefore, if $n^2$ is even then $n$ must be even.