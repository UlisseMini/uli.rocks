title: Information theory
subtitle: The only theory of information
date: 2021-07-15
cats: ["drafts"]


## The measure of information
We desire a measure for the information gain after an event with probability $p$ occurs.
We would like this measure to obey some common sense rules

$$
\begin{aligned}
h(1)  &= 0      \\
h(0)  &= \infty \\
h(p)  &\gt h(q)  \iff p \lt q \\
h(pq) &= h(p) + h(q)
\end{aligned}
$$
$h$ should also be continuous and differentiable everywhere.

These properties allow us to find a unique closed form for $h$.

*NOTE: $b^{-1}$ is unmotivated since I knew $h$ would be negative log,
changing the proof for this would be nice, I need to mention the $p \lt q$ condition too...*

By continuity there exists $b \in \mathbf R_{[0,1]}$ such that $h(b^{-1}) = 1$.
thus for $n \in \mathbf N$
$$
h(b^{-n}) = \sum^n h(b^{-1}) = n h(b^{-1}) = n
$$

Now observe at $h(b^{-c/d})$ for $c, d \in \mathbf N$
$$
h(b^{-c/d}) = c h(b^{1/d})
$$
Notice $h((b^{1/d})^{-d}) = d h(b^{1/d}) = 1 \implies h(b^{1/d}) = 1/d$. therefor
$$
h(b^{-c/d}) = ch(b^{1/d}) = c/d
$$

Now extend this to any base, look at
$$
h(a^{-c/d}) = h\left(b^{(-c/d) \log_b a}\right) = (c/d) \log_b a
$$
In the limit $\log_b a$ can be represented as a ratio. thus we have found $h$.
$$
h(p) = - \log_b p
$$
Notice that scaling by a nonnegative constant is identical to changing the base.

We could use any base, but usually base $2$ (bits) or base $e$ (nats) are used,
I'll be using bits from now on.

Now that we've found $h$, we need to build intuition for its units, what does it mean to have $1$ bit of information?

Notice $h$ is invertible so $2^{-h(p)} = p$ 

Take a fair coin toss, heads vs tails is one bit of information and as we expect $h(1/2) = 1$.

That's great for powers of $2$, but what about a unfair coin, $h(1/3)$?

*TODO: Intuition for bits in probability, use the inverse?*


## KL divergence/Relative entropy

*TODO*


## Mutual information

*TODO*


