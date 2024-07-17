---
title: Chapter 11
---
## 11.1 Technique 1: Linear Transformation
If you can make an integral look like something you know by making a simple transformation then do so.

#### Example 11.1
Find $\int (2x+3)^4 \, dx$

#### Solution 11.1
Let $u=2x+3 \implies \frac{du}{dx}=2\implies dx=\frac{du}{2}$
$$\begin{aligned} I &= \int u^4 \, \frac{du}{2} \\ &= \frac{1}{2}\int u^4 \, du \\ &=\frac{1}{2}\times \frac{1}{5}u^5 +c \\ &=\frac{1}{10}(2x+3)^5 +c\end{aligned}$$


In general, $\int f'(ax+b) \, dx = \frac{1}{a}f(ax+b) +c$. Informal method: do what you would do normally but divide by the coefficient of x.

## 11.2 Technique 2: Trig Identities
Use double angle formulae, addition formulae, Pythagorean identities, etc to make integration easier.

#### Example 11.2
Find $\int \sin^2x \, dx$

#### Solution 11.2
$\sin^2A=\frac{1}{2}(1-\cos 2A)$
$$\begin{aligned}\int \sin^2x \, dx &=\frac{1}{2}\int 1-\cos 2x \, dx \\ &= \frac{1}{2}\left( x- \frac{1}{2}\sin 2x\right) +c\end{aligned}$$

## 11.3 Technique 3: Spot the pattern
We need to be on the lookout for integrands in one of two set patterns:
- $\int k \frac{f'(x)}{f(x)} \, dx$
- $\int kf'(x)[f(x)]^n \, dx$

If we see either of these then we know that the substitution u = f (x) will produce a very simple integrand.

#### Example 11.4
Find $\int \frac{\cos x}{3+2\sin x} \, dx$

#### Solution 11.4
$$\begin{aligned} u &=3+2\sin x \\ \frac{du}{dx} &=2\cos x\end{aligned}$$

$$\begin{aligned}\int \frac{\cos x}{3+2\sin x} \, dx &=\frac{1}{2}\int \frac{1}{u} \, du \\ &=\frac{1}{2}\ln |u| +c \\ &=\frac{1}{2}\ln|3+2\sin x| +c \end{aligned}$$

## 11.4 Technique 4: Non-linear Substitution
Note that technique 3 is just a specific case of non-linear substitution. The patterns in technique 3 are just a
guarantee that the non-linear substitution approach will work.

#### Example 11.6
Find $\int 6xe^{x^2} \, dx$

#### Solution 11.6
$$\begin{aligned}u&=x^2 \\ \frac{du}{dx}&=2x\end{aligned}$$

$$\begin{aligned}\int 6xe^{x^2} \, dx &= 3\int e^u \, du \\ &= 3e^u +c \\ &=3e^{x^2} +c\end{aligned}$$
## 11.5 Technique 5: Partial Fractions
[[partial fractions]]
#### Example 11.8
Find $\int \frac{x-5}{(x+1)(x-2)} \, dx$

#### Solution 11.8
$$\begin{aligned}\int \frac{x-5}{(x+1)(x-2)} \, dx &= \int \frac{2}{x+1}- \frac{1}{x-2} \, dx \\&=2\ln|x+1|-\ln|x-2|+c \\&=\ln| \frac{A(x+1)^2}{(x-2)}  | \end{aligned}$$


## 11.6 Technique 6: Integration by parts
Recall the product rule for differentiation: $\frac{d}{dx}(uv)=u \frac{dv}{dx}+v \frac{du}{dx}\implies u \frac{dv}{dx}= \frac{d}{dx}(uv)-v \frac{du}{dx}$
$\int u \frac{dv}{dx} \, dx=\int \frac{d}{dx}(uv) \, dx-\int v \frac{du}{dx} \, dx$
$\implies \int u \frac{dv}{dx} \, dx=uv - \int v \frac{du}{dx} \, dx$

Note that sometimes you need to apply this formula more than once to answer a question. Note too that this formula doesn't do the integration for you, it only rewrites the integral.

#### Example 11.9
Find $\int x^2\ln x \, dx$

#### Solution 11.9
Let $u=\ln x$ and $\frac{dv}{dx}=x^2$

So $\frac{du}{dx}=\frac{1}{x}$ and $vu=\frac{1}{3}x^3$

$$\begin{aligned}\int x^2\ln x \, dx &= \frac{1}{3}x^3\ln x-\int \frac{1}{3}x^3 \times \frac{1}{x}\, dx \\ &=\ln x \frac{1}{3}x^3-\int \frac{1}{3}x^2 \, dx \\ &=\ln x \frac{1}{3}x^3 - \frac{1}{9}x^3 +c\end{aligned}$$


## 11.7 Trapezium Rule
There are some functions that cannot be integrated. If we want to calculate areas under one of these
functions, the best we can do is estimate. The trapezium rule allows us to do this.

$$\int^b_{a} ydx\, dx\approx \frac{1}{2}h(y_{0}+2(y_{1}+y_{2}+\dots+y_{n-1})+y_{n}) $$

## 11.8 Differential Equations (Separation of Variables)
If we have a differential equation of the form $\frac{dy}{dx}=f(x)g(y)$ then we can solve it using separation of variables: $\int \frac{1}{g(y)} \, dy = \int f(x) \, dx$