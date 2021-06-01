title: Interior point
subtitle: Solving linear programming problems
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
\nabla_h f(x+h) \approx \nabla f + (\nabla^2 f)h
$$
Equate to zero and solve for $h$
$$
\nabla f + (\nabla^2 f)h = 0 \implies h = -(\nabla^2f)^{-1} \nabla f
$$
Therefor the update rule is

$$
x_{n+1} = x_n + h = x_n - (\nabla^2 f)^{-1}\nabla f
$$

A key fact about newton's method is if we're close enough to a local optimum we get quadratic convergence.

let $y = Ax$ and $\phi(y) = f(A^{-1}y) = f(x)$
Applying newton's method to $\phi(y)$ is the same as applying it to $f(x)$

Preforming a change of basis[^3] we can find the new gradient and hessian
$$
\begin{aligned}
\nabla \phi(y)   &= (A^{-1})^T \nabla f(A^{-1}y) \\
\nabla^2 \phi(y) &= (A^{-1})^T \nabla^2 f(A^{-1}y) A^{-1}
\end{aligned}
$$

Now if we preform newton's method on $\phi(y)$ after some nice cancellation we get
$$
[\nabla^2 \phi(y)]^{-1}\nabla \phi(y) = A\left([\nabla^2 f(A^{-1}y)]^{-1} \nabla f(A^{-1}y)\right)
$$
Which is just preforming newton's method in the $x$ world, then transforming back to $y$.


[^1]: Actually we're going to the closest extreme point, we assume we're close to a minimum though.
[^2]: See [this](https://www.cs.ubc.ca/~schmidtm/Courses/Notes/linearQuadraticGradients.pdf) for derivations of the gradients
[^3]: We transpose the inverse $(A^{-1})^T$ because (TODO)

## How much can we increase t
Recall our objective function $tc^Tx + F(x)$, we want to find how large we can set $t'$ such that we're still in the radius of convergence for newton's method.

We define the *newton decrement*[^4] for some function $f$ as
$$
\lambda_f(x) = \sqrt{\nabla f(x)^T [\nabla^2 f(x)]^{-1} \nabla f(x)}
$$
Losely speaking, this measures the distance from a local optimum[^5]. notice $\lambda(x^*) = 0$

Quadratic convergence[^6] is written as

$$
\lambda_f\left(x - (\nabla^2 f(x))^{-1} \nabla f(x)\right) \le \left(\frac{\lambda_f(x)}{1 - \lambda_f(x)}\right)^2
$$

For our purposes $f_t(x) = t c^Tx + F(x)$



[^4]: The reason we restate in terms of the newton decrement is because the standard newton's method analysis isn't invariant under linear transformations.
[^5]: We don't need to worry about local optimum though since we're optimizing a convex function
[^6]: This requires the function is [self concordant](https://www.wikiwand.com/en/Self-concordant_function)

## TODO

- [ ] Prove the error on the taylor approximation is $O(||h||^2)$
- [ ] Prove quadratic convergence of newton's method

