---
title: 'Types of data and formulae'
date: '09/30/2023'
---

### Types of data

Quantitative data - Numerical data

Qualitative data - Non-numerical data

Within quantitative data variables are either:
- Discrete - the variable can only take a specific value. Eg. shoe size
- Continuous - the variable can take any value in a given range, Eg. length, 16:06

Data is usually presented in a list, frequency table or a grouped frequency table. Groups within are called **classes**

Eg. 
| Weight (nearest kg)   | Frequency    |
|--------------- | --------------- |
| 30-34   | 4   |
| 35-39   | 5   |
| 40-45   | 8   |

"30-34"
> 30 is the lower **limit**

> 34 is the upper **limit**

If it was written as $29.5\le w < 34.5$

> 29.5 is the lower **boundary** 

> 34.5 is the upper **boundary**

To calculate:

- Midpoint: $\frac {lower + upper limit (or boundary)} {2}$
- Class width: upper - lower **boundary**


## Measure of Location

Population mean - $\mu$

Sample mean - $\bar{x}$

Mean from a list of data:

$$
\bar{x}=\frac {\sum{x}}{n}
$$

Mean from a frequency table:

$$
\bar{x}=\frac {\sum{fx} } {\sum f}
$$

Median - $Q_2$

$$
Q_2=\frac {1} {2}(n+1)^{\text{th}}
$$

If there is an even amount of numbers - Half of $\sum \text{two middle numbers}$

If there is an odd amount of numbers - middle value

### Interquartiles

Lower Quartile - $Q_1$

Median - $Q_2$

Upper Quartile - $Q_3$

$$
Q_1 = \frac 1 4(n+1)^{th}
$$
$$
Q_2 = \frac 1 2(n+1)^{th}
$$
$$
Q_3 = \frac 3 4(n+1)^{th}
$$

This data can also be represented in a box and whisker plot:

![d](/img/math/2.jpeg) 

When finding quartiles if the result is:
- .5 - take mean of either side values
- .25 - round down
- .75 - round up

If data is presented in a grouped frequency table *interpolation* can be used, the formula is:

$$
Q_2 = b + \frac {(\frac {1}{2}n)-f} {f_c}* c
$$
Where:
- $n$ - Number of data points
- $b$ - Lower boundary of the selected group
- $f$ - Cumulative frequency of previous group
- $f_c$ - frequency of selected group (class)
- $c$ - class width (calculated using boundaries)

The same formula is used for the upper and lower quartiles, just the fraction before n is modified to $\frac 1 4$ and $\frac 3 4$, respectively.
