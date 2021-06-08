title: The geometry of the transpose
subtitle: SUBTITLE
date: 2021-03-09
draft: true


*NOTE: Work in progress*

Here's the plan, I'm going to assume you've watched [essense of linear algebra](https://www.3blue1brown.com/essence-of-linear-algebra-page/) and understand it.
My goal is to deepen that visual understanding to the transpose.

## Transpose properties

$$
(AB)^T = B^T A^T
$$
Proof: *TODO: geometric proof*

## Orthogonal matrices are rotations or reflections
Intuitively since $Q^TQ = I$ reflections and rotations

Proof:


## Symmetric matrices are orthoscaling
*circular argument if I use this fact for deriving the polar decomposition?*

Proof:
$$
A = A^T \implies QS = SQ^T \implies S = QSQ^T
$$
Notice $S = QSQ^T$


## The polar decomposition

You can break every transformation into scaling in orthogonal directions, then a rotation/reflection.

Proof:
Let $A = QS$ for orthogonal $Q$ and symmetric/orthoscaling $S$.

Multiply by $A^T$
$$
A^T A = SQ^TQS = SS = S^2
$$
Now, if we fine $S$ we're half done, then we just need to find $Q$.

Define a "matrix square root", $\sqrt{M^2} = M$. <br/>
Compute by diagonalizing $\sqrt{M^2} = \sqrt{X \Lambda X^{-1}} = X\sqrt{\Lambda}X^{-1}$

$S^2$ is symmetric, thus we can *always diagonalize*.
$S^2 = X\Lambda X^{-1}$



