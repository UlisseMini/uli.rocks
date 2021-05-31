title: Interior point
subtitle: Solving constrained optimization problems
date: 2021-05-20
draft: true

## Main idea

Instead of minimizing $c^Tx$ while avoiding the constraints, we define a *barrier function* $F(x)$ which blows up to infinity as we approach the barrier. then we minimize
$$t c^T x + F(x)$$
for some scaler t, which indicates how much we care about the objective vs the barrier.

Now we can use newton's method and other gradient based methods.


## Newton's method

The taylor approximation for a multivariate function is
$$
f(x + h) \approx f(x) + h^T\nabla f(x) + \frac{1}{2} h^T \nabla^2 f(x)h
$$

We want to pick $h$ such that the quadratic approximation is minimized[^1] so we take the gradient/differentiate[^2] w/r to h

$$
\nabla_h f(x+h) \approx \nabla f + \nabla^2 fh
$$
Equate to zero and solve for $h$
$$
\nabla f + \nabla^2 fh = 0 \implies h = -(\nabla^2f)^{-1} \nabla f
$$
Therefor the update rule is

$$
x_{n+1} = x_n + h = x_n - (\nabla^2 f)^{-1}\nabla f
$$

[^1]: Actually we're going to the closest extreme point, we assume we're close to a minimum though.
[^2]: See [this](https://www.cs.ubc.ca/~schmidtm/Courses/Notes/linearQuadraticGradients.pdf) for derivations of the gradients

## TODO

- [ ] Prove the error on the taylor approximation is $O(||h||^2)$
- [ ] Prove quadratic convergence of newton's method
