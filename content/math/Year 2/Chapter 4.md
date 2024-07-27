---
title: Chapter 4
---
links: [[notes/math/Year 2/Book 2 Index]]

# The Binomial Expansion
Standard [[binomial expansion]] outlines expanding $(a+b)^2$ when $n$ is a positive integer. It is important to consider what happens when $n$ is negative or a fraction.
The binomial expansion (which is included in the formula book) is:

$$
(1+x)^n = 1+nx+\frac {n(n-1)} {2!}x^2 + \frac {n(n-1)(n-2)} {3!} x^3+...
$$

Note, this only works when the first term in the bracket is **1**. When $n$ is a positive integer, this expansion is finite and exact but this isn't true if $n$ is negative or a fraction. This converges (and so is only valid) when $|x| <1$.

In general, we can expand $(a+bx)^n$ by noting that it equals $a^n(1+\frac {bx} a)^n$.