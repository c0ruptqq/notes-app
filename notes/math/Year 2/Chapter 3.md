---
title: Chapter 3
---

links: [[notes/math/Year 2/Book 2 Index]]

# Sequences and series 
## 3.1 Arithmetic Sequences
An *arithmetic sequence* is one where every term is found by adding (or subtracting) a fixed number to the previous term. Therefore $\{U_n\}$ is arithmetic if and only if $U_{n+1} -U_n = d$ for all positive integers $n$ where $d$ is a constants number (known as the common difference). To find any term of an arithmetic sequence all we need to know is the term number and the common difference.  So $U_1$ is the first term (given the letter $a$)  then the second term $U_2 = U_1 +d$, $U_3 = U_1 + 2d$ and so on. Therefore the general term $U_n = a + (n-1)d$.

## 3.2 Arithmetic Series
A *series* is formed by adding together the terms in a sequence (so the series $S_n$ is defined to be the sum of the first $n$ terms of the sequence; in other words $S_n = u_1 + u_2 + ... + u_n$). The sum of a series is the result when all the terms in the series have been added. An arithmetic series is a series based on an arithmetic sequence. Therefore for an arithmetic series:

$$\begin{aligned} S_n & = u_1 + u_2 + ... + u_n \\ & = a + (a+d) + (a+2d)+...+(a+(n-2)d)+(a+(n-1)d)(*) \end{aligned}$$

Writing this in reverse we have:

$$S_n = (a+(n-1)d) + (a + (n-2)d)+ ...+(a+2d)+(a+d)+a (+) $$

Adding (\*) and (+) gives:

$$\begin{aligned} 2S_n &= 2a + (n-1)d + 2a + (n-1)d +...+2a+(n-1)d + 2a + (n-1)d \text{[n times]} \\ & = n(2a+ (n-1)d)  \end{aligned}$$

$$\therefore S_n=\frac n 2(2a+(n-1)d) \text{ or else, equivalently, }S_n= \frac n 2 (a+l) \text{ , where l is the last term being summed}$$

## 3.3 Geometric Sequences
A *geometric sequence* is one where every term is found by multiplying the previous one by a fixed non-zero constant. Therefore $\{U_n\}$ is geometric if and only if $\frac {U_n+1} {U_n} = r$, for all positive integers $n$, where $r$ is a constant number (known as the *common ratio*). To find any term of a geometric sequence, All we need to know is the first term and the common ratio. So if *a* is the first term of our sequence then $u_2 = ar$. Therefore, the general term is given by $u_n = u_1*r^{n-1}$. 
## 3.4 Geometric Series
A *geometric series* is based on a geometric sequence. Therefore, for a geometric series,

$$\begin{aligned}S_n & = u_1 + u_2 + ...+ u_n \\ & = a + ar + ar^2 + ... + r^{n-1} \end{aligned}$$

$$ \therefore rS_n = ar + ar^2 + ... + ar^n $$


$$\therefore rS_n -S_n = ar^n-a=a(r^n-1)$$

$$\therefore S_n = \frac {a(r^n-1)} {r-1}$$

or, equivalently, 

$$S_n = \frac {a(1-r^n)} {1-r}$$

for $r \neq 1$ 
## 3.5 Sum to Infinity
If $-1 < r <1$ then when $n$ is very large $r^n \approx 0$ so $S_n$ will get closer and closer to $\frac a {1-r}$.
We say that the series *converges* and has a sum to infinity ($S_{\infty}$)of $\frac a {1-a}$.

## 3.6 Sigma Notation

To save time, sums can be written using sigma ($\Sigma$) notation. 

$$\sum_{r=a}^{b} f(r)$$

means add up all the terms you get from putting $r=a$ into a fraction and then $r=a+1$ in and so on until you get to $r=b$ 
## 3.6 Recurrence Relations
Rather than giving a direct formula for $u_n$ , an alternative approach is to use *recurrence relations* where each term is defined in terms of the previous term (or terms). To be able to define a sequence in this way we also need to be told the first term (or terms).
