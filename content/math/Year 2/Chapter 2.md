---
title: Chapter 2
---
links: [[notes/math/Year 2/Book 2 Index]]
# Functions and Graphs
## 2.1 The modulus Function
The *modulus* (also called the absolute value) of a number $a$ is written $|a|$. The Absolute value of a number is its 'size'. For example, $|5| = |-5| = 5$
A modulus function ($y=|f(x)|$) is defined as $|f(x)| = f(x)$ for $f(x) \geq 0$ and $|f(x)| = -f(x)$ for $f(x) \leq 0$.

![img/math/book-2/1.jpg](/img/math/book-2/1.jpg)

## 2.2 Graph Transformations 
![img/phys/book-2/2.jpeg](/img/math/book-2/2.jpeg)


## 2.3 Solving Equations and Inequalities Involving Modulus
When asked to solve an equation (and even more so with inequalities) that involves the modulus function, the best thing to do is draw a sketch and have a look at the number of solutions and where they occur.

#### Example 2.2
Solve:

$$
|4x|=|3x+2|
$$
#### Solution 2.2
![3.jpeg](/img/math/book-2/3.jpeg)

## 2.4 Functions and Mappings 
A *mapping* is something that transforms one set of numbers into another. We call the initial set the *domain* and the resulting set the *range*. For example:
![img/math/book-2/4.jpeg](/img/math/book-2/4.jpeg)

A *function* is a specific type of mapping where every element in the domain goes to exactly one element in the range. This means that mappings are only functions if ther are one-to-one or many-to-one.
For example, $\frac 1 x$ isn't a function iof 0 is in the domain (since 0 wouldn't be mapped to anything). Similarly, $\pm \sqrt{x}$ isn't a function even if we restrict the domain to positive numbers) since every element of the domain would be mapped to two things in the range (eg. $16 -> \pm 4$).
Note that this means that whether something is or isn't a function can depend as much on the domain as it does on the algebraic rule being applied. This means that it is crucial that the domain of a function is specified as part of its definition. 
Note that if we graph a mapping we can see quickly whether it is a function; any vertical line must hit the graph exactly once for each x-value in the domain for the mapping to be a function.

#### Example 2.3
For each of the following mappings, state whether the mapping is one-to-one, many-to-one or one-to-many and state whether it represents a function.
![img/math/book-2/5.jpeg](/img/math/book-2/5.jpeg)
#### Solution 2.3
- a) One-to-many
- b) One-to-one; is a function
- c) If 0 is excluded its a function
- d) Many-to-one; is a function

## 2.5 Composite Functions

We can combine functions to make new ones called *composite functions*. If $f$ and $g$ are two functions then $fg(x)$ (or $f * g(x)$) means to do $g$ to $x$ and then do $f$.

#### Example 2.5
Let $f(x) = 2x+1$ and $g(x)=x^2-4$ find $fg(x)$
#### Solution 2.5

$$
\begin{aligned} fg(x) & = f(x^2-4) \\ &= 2(x^2-4) +1 \\ &= 2x^2 -8 +1\\&= 2x^2-7 \end{aligned}
$$

## Inverse Functions
The inverse function of $f$ (called $f^{-1}$) 'undoes' the function so doing $f$ and $f^{-1}$ to something is the equivalent of not doing anything.
Note that:
1) Only one-to-one functions have inverse functions (since if a function is many-to-one the inverse mapping will be one-to-many so won't be a function)
2) The graph of $y = f^{-1}(x)$ is a reflection of the graph of $y = f(x)$  in the line $y = x$
3) The domain of $f$ if the range of $f^{-1}$
4) The range of $f$ if the domain of $f^{-1}$

This first point means that for many-to-one functions we sometimes need to restrict the domain of the function before we are able to find the inverse (eg. $f(x) = x^2$ has no inverse for the domain $x \in \mathbb{R}$ but does for the domain $x \geq 0$.
The last two points mean that we can answer questions about the domain and range of an inverse function without ever needing to work out what the definition of the inverse function is.
