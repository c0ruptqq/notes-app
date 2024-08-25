---
title: Chapter 12
---
# 12 Vectors
## 12.1 3D Coordinates
<!--ID: 1724603671359-->


Use the right hand rule to visualise (x,y,z):
- Thumb (x)
- Index (y)
- Middle (z)

In 3D we need a z-axis.
Coordinates are given as (x, y, z). To find distances in 3D we still use Pythagoras:
- The distance from the origin to (x,y,z) is $\sqrt{ x^3+y^2+z^2 }$
- The distance from (x,y,z) to ($x_{1}$,$x_{2}$,$x_{3}$) is $\sqrt{ (x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2} +(z_{2}-z_{1})^{2} }$

## 12.2 3D Vectors
In 3D we now need to consider k (the unit vector in the z-direction) as well as i and j.
#### Example 12.1
The points A and B have coordinates (t, 5, t – 1) and (2t, t, 3) respectively. Find $|\vec{AB}|$ and find the minimum value that $|\vec{AB}|$ can be.

#### Solution 12.1
$$
\begin{aligned}\vec{AB}&=\vec{OB}-\vec{OA} \\ &=\begin{pmatrix}2t \\ t\\ 3\end{pmatrix} - \begin{pmatrix}t \\ 5 \\t-1\end{pmatrix} \\ & = \begin{pmatrix}t \\ t-5 \\ 4-t\end{pmatrix}\end{aligned}
$$

$$
\begin{aligned}\therefore |\vec{AB}| &= \sqrt{ t^{2}+(t-5)^{2}+(4-t)^{2}}\\&=\sqrt{ 3t^{2}-18t+41 }\\ \therefore d^{2}&=3t^{2}-18t+41 \\ \frac{d(d^{2})}{dt} &= 6t-18 \\ \text{@ min } \frac{d(d^{2})}{dt} &= 0 \implies t=3 \\ \therefore \text{ min }|\vec{AB}| &= \sqrt{ 3(3)^{2}-18(3)+41 } \\ &=\sqrt{ 14 }
\end{aligned}
$$
## 12.3 Geometric Problem Solving
In 2D, if vectors a and b are non-parallel then you can compare their coefficients on both sides of an equation. For example, if $3a + 4b = xa + yb$ then $x = 3$ and $y = 4$.
In 3D the equivalent idea says that if vectors a, b and c are not co-planar (ie. don’t all lie in the same plane) then you can compare their coefficients on both sides of an equation. For example, $3a + 4b – 5c = xa + yb + zc$ then $x = 3$, $y = 4$ and $z = –5$.

#### Example 12.2
![/img/Pasted image 20240506181519.png](img/math/book-2/22.png)

#### Solution 12.2
If OE and BG intersect then call the point of intersection X. Strategy: Find two routes of $\vec{OX}$ and equate them

$$
\begin{aligned}\vec{OX}&=\lambda \vec{OE} \\ &=\lambda(\underline{a}+\underline{b}+\underline{c})\end{aligned}
$$
$$
\begin{aligned}\vec{OX} &= \vec{OB}+ \vec{BX} \\ &=\underline{b}+ \mu \vec{BG} \\ &=\underline{b}+\mu(-\underline{b}+\underline{g}+\underline{c}) \\ &= \mu \underline{a} + (1+\mu)\underline{b}+ \mu \underline{c}\end{aligned}
$$
$$
\begin{aligned}1= 2 \implies \lambda \underline{a} + \lambda \underline{b} + \lambda \underline{c} &= \mu \underline{a}+ (1-\mu)\underline{b}+ \mu \underline{c} \\ \therefore \lambda&=\mu \\ \therefore \lambda &=1-\mu \\ \mu &=0.5 \\ \lambda &= 0.5 \\ \therefore \vec{OX}= \frac{1}{2}\vec{OE}& \text{ and  }\vec{BX} = \frac{1}{2}\vec{BG}\\ \implies &\text{ diagonals bisec eachother }\end{aligned}
$$
## 12.4 Forces Problems

#### Example 12.3
A particle of mass 0.5 kg is acted on by three forces: $F1 = (2i – j + 2k)$ N, $F2 = (–i + 3j – 3k)$ N and $F3 = (4i – 3j – 2k)$ N.
1) Find the resultant force R acting on the particle.
2) Find the acceleration of the particle.
3) Given that the particle starts at rest, find the distance travelled by the particle in the first 6 seconds of its motion.

#### Solution 12.3 
$$
\begin{aligned}\underline{R}&=\underline{F_{1}}+\underline{F_{2}}+\underline{F_{3}} \\ &= (5\underline{i}-\underline{j}-3\underline{k})\end{aligned}
$$
$$
\begin{aligned}\underline{F} &= m\underline{a} \\ \underline{a}&=\frac{\underline{F}}{m} \\&= \frac{(5\underline{i}-\underline{j}-3\underline{k})}{0.5} \\ &=(10\underline{i}-2\underline{j}-6\underline{k})\end{aligned}
$$
$$
\begin{aligned}s &= ut + \frac{1}{2}at^{2}\\ &=\frac{1}{2}\times 2\sqrt{ 35 }\times 6^{2}\\ &= 35 \sqrt{ 35 }m\end{aligned}
$$