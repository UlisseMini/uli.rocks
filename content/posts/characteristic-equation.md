title: Characteristic Equations
subtitle: SUBTITLE
date: 2021-05-06
cats: ["drafts"]


I noticed a pattern recently where you can solve problems by "guessing" the form of the solution
then solving a polynomial

## Differential equations

Lets say we have a differential equation of the form
$$
y'' + py' + qy = 0
$$
Guess $y = e^{rt}$

$$
r^2e^{rt} + p \cdot re^{rt} + q \cdot e^{rt} = 0 \\
$$

Factor out $e^{rt}$
$$
e^{rt}(r^2 + pr + q) = 0
$$
Quadratic equation! solve for $r$ then use intial conditions to find $p$ and $q$

This also shows there is always a solution $e^{rt}$ for a diffeq of the form
$$
c_ny^{(n)} + \dots + c_1y' + c_0y = 0
$$
Since you can let $y = e^{rt}$ then factor out and solve the polynomial.
a solution always exists if $r \in \mathbf C$


## Recurrance relations
$$
p_{n+1} = cp_{n} + dp_{n-1}
$$

Guess $p_i = x^i$

$$
x^{n+1} = cx^{n} + dx^{n-1} \\
$$
Divide by $x^{n-1}$
$$
x^2 = cx + d
$$
Quadratic equation! solve for $x$ then use initial conditions to find $c$ and $d$.

Sadly we must verify our solution for $x$ works, since unlike the differential equations example
we don't know if $p_i = x^i$ is true or not.

## Linear algebra

$$
A = X\Lambda X^{-1}
$$

By definition
$$
e^A = \lim_{n \to \infty} \sum_{k=0}^n \frac{1}{k!} A^k = \lim_{n \to \infty} X\left(\sum_{k=0}^n \frac{1}{k!} \Lambda^k\right)X^{-1}
$$

Exponentiating $\Lambda$ just raises each $\lambda_i ^k$ then divides and sums them up, so we get
$$
e^A = Xe^{\Lambda}X^{-1}
$$
Where
$$
e^{\Lambda} = \begin{bmatrix}
    e^{\lambda_1} & & \\
    & \ddots & \\
    & & e^{\lambda_n}
  \end{bmatrix}
  $$


## TODO

- [x] Justify $e^{rt}$ always being a "pure" solution to a the diffq
- [ ] Justify $x^i$ being a reasonable assumption for solving recurrances
- [ ] Show how second order linear diffq is identical to system of 2 first order diffq
- [ ] Send to euler2 for peer review

Eigenstuff, connection with markov matrices.
is diagonalizing a markov matrix the same as solving the recurrance?
