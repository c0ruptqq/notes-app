---
title: Chapter 8
---
# 8.1 Parametric Equations

## 8.1 Introduction

Curves can be described using parametric equations. A parametric graph is one in which x and y, instead of being directly linked in a Cartesian equation (like $y = x^2$) are instead both linked to another variable (called a parameter). For example, $y = t^2$, $x = 3t$ is a parametric graph going through (0, 0), (1, 3), (4, 6) etc (each value of t gives an (x, y) point). It is usually possible to find a Cartesian equation for a graph from its parametric equations by eliminating
the parameter.

#### Example 8.1
Find a Cartesian equation for the parametric curve $x=5t$, $y=3t^2$ $(0<t<20)$, stating its domain

#### Solution 8.1
$$
x = 5t => t= \frac x 5
$$

$$
\begin {aligned} \therefore y &=3(\frac x 5)^2 \text{ for } 0< \frac x 5 < 20 \\ & = \frac {3x^2} {25} \text{ for } 0<x<100 \end{aligned}
$$

For parametric equations involving trig functions, if you can't find a simple way to link x and y, use an appropriate trig identity.

#### Example 8.2
Find the Cartesian equation of the curve $x=\sin t + 2$, $y=\cos t -3$

#### Solution 8.2

$$
x=\sin t => \sin t = x-2
$$

$$
y = \cos t -3 => \cos t =y+3
$$

$$
\therefore \cos^2 t\sin^2 t = 1 => (x-2)^2 + (y+3)^2 = 1
$$


## 8.2 Working with Parametric Equations

#### Example 8.3

The diagram shows a curve C with parametric equations $x = at^2 + t$, $y = a(t^3 +8)$,  where $a$ is a non-zero constant. Given that C passes through the point (–4, 0),
a) find the value of a,
b) find the coordinates of the points A and B where the curve crosses the y-axis.
![img/math/book-2/9.png](/img/math/book-2/10.png)

#### Solution 8.3
a) (-4,0) on C => 

$\begin{aligned} &1) -4=at^2 + t \\ &2) 0 = a(t^3+8) \\ &t^3 + 8=0 \\ & t = -2\end{aligned}$

$\therefore 1) -4=a(-2)^2 -2$

$\therefore a= -\frac {1} {2}$ 

b) @ A and B $x=0$

$$
\therefore - \frac {1} {2} t^2 + t=0
$$
$$
t(- \frac {1}{2}t+1)=0
$$
$$
@t=0 \text{ } y=- \frac {1}{2}(8)=-4
$$

$$
@t=2 \text{ } y=- \frac {1}{2}(16)=-8
$$

$$
\therefore A=(0,4) \text{ } B=(0,-8)
$$

#### Example 8.4
A curve is given parametrically by the equations $x=t^2$, $y=4t$. The line $x+y+4=0$ meets the curve at A. Find the coordinates of A.

#### Solution 8.4

$$
\begin{aligned}x=t^2 \\ y=4t \\x+y+4=0 \\ t^2+4t+4=0 \\ t=-2 \\ \therefore @t=-2 \text{ } & x=4 \\ &y=-8 \\ \therefore A=(4,-8)\end{aligned}
$$


## 8.3 Finding Areas under Parametric Curves
We know that the area under a graph (bounded by $x = a$ and $x = b$) is given by $\int^b_aydx$. This can be shown to be the same as $\int^{t_2}_{t_1}y\frac{dx}{dt}dt$; we can use this for parametric curves.

#### Example 8.5
Work out the area bounded by the x-axis, the y-axis, the line $x = 20$ and the parametric curve $x=5t^2$,$y=t^3$ ($t\geq0$)

#### Solution 8.5
It is important to change the limits when integrating by substituting them into the $x=...$ equation the taking the results for the new limits.
$$
\begin{aligned}\text{Area} &= \int^{20}_0ydx \\ &=\int^2_0y\frac{dx}{dt}dt \\ &=\int^2_0t^3*10t dt \\ &=\int^2_0 10t^4 dt \\ &=[2t^5]^2_0 \\ &=64\text{ units}^2\end{aligned}
$$