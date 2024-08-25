---
title: 'Electricity'
date: '09/30/2023'
---
<!--ID: 1724603671327-->


In a circuit:

<img src="/img/phys/10.png" alt="" width="400"/>

__Ammeter__
- Ideally has zero resistance
- Measures amps (A)

__Voltmeter__
- Ideally has infinite resistance
- Measures potential difference (V)

__Definitions__
- Current (I) - rate of flow of charge
$$
\text{charge}=\frac {\Delta Q} {\Delta T}=\frac {\text{coulombs (C)}} {\text{seconds (S)}}
$$

- Charge of an electron - $1.6x10^{-19}C$
- Potential difference (V)
$$
V=\frac W Q=JC^{-1}
$$
Where "W" is work done

Eg. Electrical energy (Joules)

$$
W=IV\Delta{t}
$$

- Power - rate at which work is done 

Eg. Electrical power (Watts)

$$
P=IV
$$

$$
P=\frac {W}{\Delta T}=\frac{IV\Delta{T}}{\Delta{T}}=IV
$$

- Electrical resistance (R)

$$
R=\frac{V}{I}
$$
Where R is in ohms ($\Omega$), the above equation is also know as Ohm's Law


A standard variable resistor can be replaced by a *potentiometer*:

![potentiometer](/img/phys/13.png) 

A potentiometer is used to vary potential difference across a component, it a greater range of voltage across a component than a variable resistor.

A diode is a type of an electronic valve. It allows current to flow in 1 direction around a circuit. A diode is a semiconductor.

![diode](/img/phys/16.png) 

### I/V graphs

In an I/V graph if the line is straight and passes through (0,0) then the relationship is linear and proportional. Below are I/V graph of three components:
![graphs](/img/phys/15.png) 

In a bulb the gradient (resistance R) increases as bulb heats up. As it heats up, atoms vibrate with greater KE, thus electrons collided with them with increasing frequency, thus flow decreases and R increases.

In a diode when the gradient in negative (on/below the X axis) the diodes resistance is infinite. To begin to conduct it needs to reach a threshold voltage after which the gradient increases (as seen in the graph).

### Series and parallel circuits

$\xi$ is a symbol used to symbolise the voltage across a cell.

emF - electro-motive-force - energy per charge flowing through the cell of a battery.

In *series*:
- $R_\text{total} = R_1 + R_2 + ... + R_n$
- Current is the same everywhere
- Potential difference is shared (split) across the circuit

In *parallel*:
- $\frac {1} {R_{\text{total}}} = \frac {1} {R_1} + \frac {1} {R_n}$
- Current is shared (split)
- Potential difference is the same across the circuit

### Kirchoff's laws:

- The sum of the emfs is equal to the sum of the potential differences around a circuit. (Also know as conservation of energy)
- At any junction the total current entering the junction is equal to the total current leaving the junction (node).
]
#### Potential divider rule:

Only applies to series circuits.
$$
V_n = \frac {R_n} {R_total} * \mathcal{E}
$$
$$
\frac {V_1} {V_2} = \frac {R_1} {R_2}
$$

#### Current divider rule:
Only applies to parallel circuits.
$$
I_1 = \frac {R_2} {R_1+R_2} * I
$$
Where $R_2$ is the opposite resistor to the one for which current is being found.

## Resistivity

- Resistivity is a property of a materal which gives it its resistance
- $\text{Conductivity}=\frac {1} {\text{resistivity}}$
- A good conductor has low resistivity 

If we consider a conductor of length $L$, cross-sectional area $A$ and resistivity $\rho$. Then the relationship between them will be as follows:
$$
R \propto L
$$
$$
R \propto \rho
$$
$$
R \propto \frac 1 A
$$
Thus:
$$
R = \frac {\rho L}{A}
$$

Where:
- $R$ - $\Omega$
- $\rho$ - $\Omega m$ 
- $L$ - $m$ 
- $A$ - $m^2$

