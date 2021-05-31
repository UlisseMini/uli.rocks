title: Generating Functions
subtitle: A crazy solution to the dice problem
date: 2021-05-20


> A generating function is a device somewhat similar to a bag. Instead of carrying many little objects detachedly, which could be embarrassing, we put them all in a bag, and then we have only one object to carry, the bag.

> \- George Pólya, Mathematics and plausible reasoning (1954)


## Probability generating function

We define a PGF as $g(t) = E[t^X]$. for this article $X$ will be a **discrete** random variable.

This is an interesting defintion since by [LOTUS](https://www.wikiwand.com/en/Law_of_the_unconscious_statistician) with $p_k = P(X = k)$

$$
g(t) = E[t^X] = \sum_{k=0}^{\infty} p_k t^k
$$
The crazy idea here is we can use calculus on $g(t)$, since its an differentiable function!

$$
g'(t) = \sum_{k=0}^{\infty} p_k kt^{k-1}
$$
Letting $t=0$ every term dies except the $k=1$ term which is $p_1 \cdot 1 \cdot 0^0 = p_1$

The general case of what we discovered is the nth derivative at zero being $p_n n!$
$$
g^{(n)}(0) = \sum_{k=0}^{\infty} p_k \frac{k!}{(k - n)!} 0^{k - n} = p_n n!
$$
That means we can recover each $p_k = P(X = k)$ from the PGF $g(t) = E[t^X]$, amazing!

Plugging in $t=1$ gives us $E[X]$ by LOTUS
$$
g'(1) = \sum_{k=0}^{\infty} p_k k \cdot 1^{k-1} = \sum_{k=0}^{\infty} k p_k = E[X]
$$

This is useful because finding expected values can be easier then finding probabilies since we have linearity.

## Dice problem

Let $X = X_1 + \dots + X_6$ and let $X_i$ be the number rolled by the $i$'th die

Since $X_i$ are independent we use the fact that $E[XY] = E[X]E[Y]$ if $X$ and $Y$ indep
$$
g(t) = E[t^X] = E[t^{X_1 + \dots + X_6}] = E[t^{X_1}] \cdots E[t^{X_6}] = \left(E[t^{X_1}]\right)^6
$$
We know $E[X_i] = \frac{1}{6}(t^1 + t^2 + \dots + t^6)$ by LOTUS, plugging that in gives us
$$
g(t) = \left(E[t^{X_1}]\right)^6 = \left(\frac{1}{6}(t^1 + \dots + t^6)\right)^6
$$
We know $g^{(18)}(0) = P(X = 18)$ leading us to the amazing conclusion
> *The probability of six die summing to 18 is the coefficient of the $t^{18}$ term*

Simplifying this to make finding the coefficients easier is now a matter of algebra not probability!

## Proof of expectation
(Assume X,Y are discrete, the continuous case is done by interchanging integrals)

Proof is by factoring out $xP(X=x)$ and then factoring out the sum
$$
\sum_{x=0}^{\infty} \sum_{y=0}^{\infty} xy P(X=x)P(Y=y) = \sum_{x=0}^{\infty} xP(X=x) \sum_{y=0}^{\infty} y P(Y=y) = E[X]E[Y]
$$

## Background story
If you've done any probability you've likely come across a problem like this

> *What is the probability that the total after rolling 4 fair dice is 21?*

When I heard this problem in stat110 [strategic practice](https://projects.iq.harvard.edu/files/stat110/files/strategic_practice_and_homework_1.pdf) I tried to solve it in general, after spending several hours I gave up. 
It turns out the solution was just to manually list cases!

This bugged me, as a programmer I hate doing things manually. but not seeing a better way I continued on.

Interestingly, a similar thing happened to Frederick Mosteller in his sophomore year[^1]


[^1]: [https://math.stackexchange.com/a/2137473](https://math.stackexchange.com/a/2137473)
