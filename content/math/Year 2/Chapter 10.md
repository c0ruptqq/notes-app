---
title: Chapter 10
---
# 10 Numerical Methods (Chapter 10)
## 10.1 Change of Sign and Continuity
If $f(a)$ is positive and $f(b)$ is negative (or visa versa) then the equation $f (x) = 0$ must have a root between $a$ and $b$ (so long as the graph $y = f (x)$ is continuous on the interval).

#### Example 10.1
Show that the equation $ln(x) = \frac{1}{x}$ has a solution in the interval $1.7<x<1.8$

#### Solution 10.1
Rearrange to $f(x)=0$

$$
f(x)=\ln x-\frac{1}{x}
$$
$$
f(1.7)=-0.0576\dots
$$
$$
f(1.8)=0.0320\dots
$$

Therefore change of sign and continuity means $\ln x-\frac{1}{x}=0$ has a root in the interval $1.7<x<1.8$

## 10.2 Iteration Methods
#### Example 10.2
Find a solution to $x^2-4x+1=0$ (to 2 d.p.) using iteration methods

#### Solution 10.2
$$
\begin{aligned}&x^{2}-4x+1=0\\ &x^{2}=4x-1 \\ &x=4- \frac{1}{x} \\ &x_{n} = 4-\frac{1}{x_{n}-1}, \text{ let } x_{0} =1 \\ &x_{1} = 4-\frac{1}{1}=3 \\ &x_{2}=3.67 \\ &x_{3} =3.73 \\ &x_{4}=3.73 \implies \text{This suggests a solution at } x=3.73 \\ & \text{Then find limits and use method 1. Ie.} \\ & f(3.725)=-0.024\dots \\ &f(3.735)=0.010\dots \\ &\text{Change of sign and continuity} \\ &\implies  \text{root in interval} \\ & \implies x=3.73\end{aligned}
$$

Things to note:
- In general, to solve an equation $f (x) = 0$ by an iterative method, rearrange to get $x = g (x)$ and use the iterative formula $x_{n} = g (x_{n} – 1)$.
- Different rearrangements of $f (x)$ can give you different roots of the equation.
- Sometimes (normally depending on your choice of x0) the iterations won't converge to anything and so the method won't work. (see p279 example 5)

Because of the fact that different rearrangements and different x0 choices can lead you to different outcomes,
you are usually told which rearrangement and $x_{0}$ to use.


![/img/math/book-2/13.png](/img/math/book-2/13.png)

## 10.3 Newton-Raphson Method
The Newton-Raphson method is based of an iterative formula which says $x_{n+1}=n_{n}- \frac{f(x_{n})}{f'(x_{n})}$

This rule can be used to find successive approximate solutions to an equation of the form $f (x) = 0$. Note that this rule won’t always converge to a root (particularly if you start from a bad approximation you can find that you get further from the root).

#### Example 10.3

#### Solution 10.3
a) Since $f'(p)=0$ (as its a stationary point) you can't evaluate the next term in the iterator

b) 
$$
\begin{aligned}f'(x)&=3x^{2+4x-5}\\ x_{n+1}&=n_{n}- \frac{f(x_{n})}{f'(x_{n})} \\ &=  n_{n} - \frac{x_{n}^{3}+2x_{n}^{2-5x_{n}-4}}{3x_{n}^{2+4x_{n}-5}}\end{aligned}
$$

$$
\begin{aligned}x_{0}&=2 \\ x_{1} &= 2- \frac{f(2)}{f'(2)} \\ &=\frac{28}{15} \\ x_{2} &=\frac{28}{15}-\frac{f\left( \frac{28}{15} \right)}{f'\left( \frac{28}{15} \right)} \\ &=1.856\end{aligned}
$$

c) 
$$
\begin{aligned} f(1.8555) &= -3.475 \times {10^{-3}} \\ f(1.8565)&=9.28\times 10^{-3}\end{aligned}
$$

Change of sign and continuity => root in this interval. So x = 1.856.