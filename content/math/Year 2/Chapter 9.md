---
title: Chapter 9
---

# Differentiation
![](/img/math/book-2/12.png)

## 9.1 The Chain Rule (used for differentiating composite functions)
Informal method for using the chain rule: do what you would do normally and multiply by the derivative of
the bracket!

#### Example 9.1
Differentiate $y=(3x^4+x)^5$

#### Solution 9.1

$$
\begin{aligned}y&=(3x^4+x)^5 \\&=5(3x^4+x)^4(12x^3+1)\end{aligned}
$$

#### Example 9.2
Differentiate $y=\frac{1}{\sqrt{5x-3}}$

#### Solution 9.2

$$
\begin{aligned} y &= (6x-3)^{\frac{1}{2}} \\ \frac{dy}{dx} &= - \frac{1}{2}(6x-3)^{-\frac{3}{2}} * 6 \\ &= -3(6x-3)^{-\frac{3}{2}}\end{aligned}
$$
## 9.2 The Product Rule (used to differentiate when there are two functions multiplied together)
The product rule says that if $y=uv$ then $\frac{dy}{dx} = v\frac{du}{dx}+u\frac{dv}{dx}$ where $u$ and $v$ are functions of x.

#### Example 9.3
Differentiate $y=x^2\sqrt{ 3x-1 }$

#### Solution 9.3
$$
u=x^2 \implies \frac{du}{dx} =2x
$$
$$
v=(3x-1)^{\frac{1}{2}} \implies \frac{dv}{dx}= \frac{3}{2}(3x-1)^{\frac{1}{2}}
$$

$$
\begin{aligned} \frac{dy}{dx}&=x^2* \frac{3}{2}(3x-1)^{-\frac{1}{2}}*(3x-1)^{\frac{1}{2}}*2x \\ &=\frac{1}{2}x(3x-1)^{-\frac{1}{2}}(3x+4(3x-1)) \\ &=\frac{1}{2}x(3x-1)^{-\frac{1}{2}}(15x-4)\end{aligned}
$$

## 9.3 The Quotient Rule (used to differentiate when there is one function dividing another)
The quotient rule says that if $y=\frac{u}{v}$ then $\frac{dy}{dx}=\frac{v\frac{du}{dx}-u \frac{dv}{dx}}{v^2}$ where $u$ and $v$ are functions of x. This is given in the formula book.

#### Example 9.4
Differentiate $y=\frac{x}{2x+5}$

#### Solution 9.4
$$
y=\frac{x \to u}{2x+5 \to v}
$$
$$
\begin{aligned}\frac{dy}{dx} &=\frac{(2x+5)*1-(x*2)}{(2x+5)^2} \\ &=\frac{5}{(2x+5)^2}\end{aligned}
$$
#### Example 9.5 
Differentiate $y=\frac{3x^2+5}{\sqrt{ 2x+1 }}$

#### Solution 9.5
$$
u=3x^2+5
$$
$$
v=(2x+1)^{\frac{1}{2}}
$$
$$
\begin{aligned} \frac{dy}{dx}&=\frac{\left(  (2x+1)^{\frac{1}{2}}*6x \right)-\left( (3x^2+5)*(2x+1)^{\frac{1}{2}} \right) }{2x+1} \\ &=\frac{9x^2+6x-5}{(2x+1)^{\frac{3}{2}}}\end{aligned}
$$


## 9.4 Differentiating Trig Functions
sinx differentiates to cosx 

cosx differentiates to –sinx

tanx differentiates to sec2x

#### Example 9.6
Differentiate the following:
a) $f(x)=\sin_{4}x$
b) $g(x)=5x^2\tan (3x^2-2x)$
c) $h(x)=\sec^2(4x)$

#### Solution 9.6
a) $f'(x)=4\cos4x$
b) $g'(x)=5x(x(9x^2-2)\sec^2(3x^3-2x)+2\tan(3x^3-2x))$
c) $h'(x)=8\tan_{4}x\sec^24x$

## 9.5 Differentiating Exponentials and Logarithms
By definition, the graph $y=e^x$ has a gradient that is equal to the y-value at any point.

$$
y=e^x, \frac{dy}{dx}=e^x
$$

$$
y=e^{f(x)}, \frac{dy}{dx}=f'(x)e^{f(x)}
$$

$$
y=\ln(x), \frac{dy}{dx}=\frac{1}{x}
$$

$$
y=\ln(f(x)), \frac{dy}{dx}=\frac{f'(x)}{f(x)}
$$

$$
y=a^x, \frac{dy}{dx}=a^x\ln a
$$

## 9.6 Differentiating Parametric Curves
We know that the gradient of a curve is given by $\frac{dy}{dx}$. If the curve is given parametrically then we can use the chain rule to find the gradient: $\frac{dy}{dx}=\frac{dy}{dx}\div \frac{dx}{dt}$

#### Example 9.9
Find the equation of the normal at the point P where $\theta = \frac {\pi}{6}$, on the curve with parametric equations $x=3\sin \theta$, $y=5\cos \theta$.

#### Solution 9.9
$$
\begin{aligned}p &= (3\sin \frac {\pi}{6}, 5\cos \frac {\pi}{6}) \\ &= (\frac {3}{2},\frac {5\sqrt{3}}{2})\end{aligned}
$$

$$
\frac {dx}{d \theta} = 3 \cos \theta
$$
$$
\frac {dy}{d\theta} = -5\sin{\theta}
$$

$$
\therefore \frac {dy}{dx} = \frac {-5\sin\theta}{3\cos\theta} = - \frac {5}{3}\tan\theta
$$
$$
@ \theta = \frac {\pi}{4}
$$
$$
\frac{dy}{dx} = - \frac {5\sqrt{3}}{3} => m_n = \frac{3\sqrt{3}}{5}
$$
$$
y-\frac{5\sqrt{3}}{3}= \frac{3\sqrt{3}}{5}(x-\frac{3}{2}) => y=\frac {3\sqrt{3}}{5x}+ \frac {8\sqrt{3}}{5}
$$


## 9.7 Implicit Differentiation
We need to know how to differentiate functions that are defined implicitly (for example, $z=x^2+3y^2$. We do this by using the chain rule (and any other rules needed), remembering that $\frac{d}{dx}=\frac{d}{dy}\times \frac{dy}{dx}$.

#### Example 9.10
Find the value of $\frac{dy}{dx}$ at the point (1,1) where $4xy^2+\frac{6x^2}{y}=10$

#### Solution 9.10

$$
\begin{aligned} \frac{d}{dx}: 4y^2+4x \times 2y\frac{dy}{dx}+\frac{y\times 12x-6x^2 \times \frac{dy}{dx}}{y^2} =0\end{aligned}
$$

$$
@ (1,1)
$$

$$
(1,1)\implies 4+8 \frac{dy}{dx} + \frac{12-6 \frac{dy}{dx}}{1} =0
$$

$$
16+2 \frac{dy}{dx} =0
$$

$$
\frac{dy}{dx} = -8
$$


#### Example 9.11
Find the coordinates of any stationary points on the curve $x^2-3xy-4y^2+64=0$

#### Solution 9.11

$$
\frac{d}{dx}=2x-\left( 3x \frac{dy}{dx} +3y \right)-8y \frac{dy}{dx} =0
$$

$$
\frac{dy}{dx}= \frac{2x-3y}{3x+8y}
$$

$$
\text{@ stationary point } \frac{dy}{dx}=0 \implies 2x=3y\implies y = \frac{2}{3}x
$$

$$
\begin{aligned}x^2 -3x\left(  \frac{2x}{3} \right)-4\left( \frac{2x}{3} \right)^2 + 64 &=0
 \\ x^2 -2x^x - \frac{16x^2}{9} +64 &=0 \\ \frac{25x^2}{9}&=64 \\ 5x &=\pm 24 \\ x&=\pm \frac{24}{5}\end{aligned}
$$

## 9.8 Second Derivatives
- If $f"(x)\leq 0$ the curve is concave
- If $f"(x)\geq 0$ the curve is convex

![img/math/book-2/9.png](/img/math/book-2/11.png)

Points of inflection is when the derivative changes sign and $f"(x)=0$. At every point of inflection $f"(x)=0$ but not every $f"(x)=0$ is a point of inflection.

#### Example 9.12
Find the interval on which the function $f(x)=x^3+4x+3$ is concave.

#### Solution 9.12

$$
\begin{aligned}f(x)&=x^3+4x+3 \\ f'(x) &=3x^2+4 \\ f"(x) &=6x \\ concave \implies 6x\leq 0 \\x\leq 0\end{aligned}
$$

## 9.9 Connected Rates of Change and Forming Differential Equations

#### Example 9.14
Given that the area of a circle $A cm2$ is related to its radius $r$ by $A = \pi r^2$, and that the rate of change of its radius in cm/s is given by $\frac{dr}{dt}=5$, find $\frac{dA}{dt}$ when r = 3.

#### Solution 9.14
Want: $\frac{dA}{dt}$

Have: $\frac{dA}{dr}$, $\frac{dr}{dt}$

Use: 
$$
\begin{aligned}\frac{dA}{dt} &= \frac{dA}{dr} \times \frac{dr}{dt} \\ &=2\pi r \times 5 \\ &=10\pi r \\ @ r=3 \\ \frac{dA}{dt}= 30\pi \text{ }cm^2/s\end{aligned}
$$

#### Example 9.15
The rate at which radioactive particles decay is proportional to the number of particles remaining. Write down a D.E. for the rate of change of the number of particles.

#### Solution 9.15
Let P be the number of particles at time t

$$
\frac{dp}{dt}\propto P
$$

$$
\frac{dp}{dt}=-kP
$$

#### Example 9.16
The head of a snowman has radius R cm and it loses volume by evaporation at a rate proportional to its surface area. Assuming that the head is spherical, that the volume of a sphere is $\frac{4}{3}\pi R^3$ and that the surface area is $4\pi R^2$, write down a D.E for the rate of change of the radius of the snowman's head.

#### Solution 9.16
Want: $\frac{dr}{dt}$

Have: $\frac{dv}{dr}$, $\frac{dA}{dR}$, $\frac{dv}{dt}$

$$
\begin{aligned}\frac{dR}{dt}&=\frac{dR}{dr} \times \frac{dr}{dt} \\ &=\frac{1}{4\pi r^2}\times-kA \\&=\frac{1}{4\pi r^2} \times -k4\pi R^2 \\ &=-k
\end{aligned}
$$