---
title: Capacitance
---
# Intro
A capacitor stores charge. Its made of parallel conducting plates with an insulator (dielectric) between them. How much charge can be stored per unit of potential difference is <mark class="hltr-purple">capacitance</mark>:



$$
C=\frac{Q}{V}
$$

where C is capacitance in <mark class="hltr-purple">farads</mark> (F), Q is stored charge and V is potential difference. 1 Farand = 1 Coulomb per Volt. 

![/img/phys/capacitor.png](/img/phys/capacitor.png)

In <mark class="hltr-purple">series</mark> the total capacitance is equal to the total distance of all capacitors in the circuit. Therefore:
$$
\frac{1}{C_{TOT}}=\frac{1}{C_{1}}+\dots+\frac{1}{C_{n}}
$$
In <mark class="hltr-purple">parallel</mark> the total capacitance is equal to the sum of the plate areas of all capacitors in the circuit. Therefore:
$$
C_{TOT}=C_{1}+\dots+C_{n}
$$

# Energy
## Stored
The energy stored in a capacitor is electrical potential. Plotting voltage against charge gives a relationship between them, where the gradient is capacitance and area is energy stored.
![area.png](img/phys/area.png)
$$
\text{Area}=\frac{1}{2}QV=\frac{1}{2}CV^2
$$
## Charging
When charging, Q and V change still shows exponential decay. 
![charge.png](img/phys/charge.png)

$$
Q=Q_{0}(1-e^{-\frac{1}{RC}})
$$
$$
V=V_{0}(1-e^{-\frac{1}{RC}})
$$
## Discharging
$$
Q=Q_{0}(e^{\frac{-1}{RC}})
$$
$$
V=V_{0}(e^{\frac{-1}{RC}})
$$

## Time constant
RC is the time constant $\tau$. The time constant represents the time taken by the capacitor to be charged by $(1-\frac{1}{e})\%$ or changes by a factor of $\frac{1}{e}$.