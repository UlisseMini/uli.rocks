title: Newton's Method
subtitle: Finding roots of functions
date: 2021-02-21
cats: ["drafts"]


Let's say we want to find $f(x) = 0$ for some function, where solving explicitly is impossible. but you can evaluate $f(x)$ and $f^\prime(x)$

You might come up with the clever idea of approximating $f(x)$ by a tangent line, then finding where the line hits zero.

<iframe src="https://www.desmos.com/calculator/fayhfuft5b?embed" width="600px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

$\frac{f(x_1)}{f^\prime(x_1)}$ is the base because derivative is slope, which gives us the base $b$
$$
f'(x) = \frac{f(x)}{b} \implies b = \frac{f(x)}{f'(x)}
$$

Intuitively $\frac{dx}{dy} f(x_1)$, is converting some change in Y to the corresponding change in X.
Using this we can now find $x_2$ using $b$
$$
x_2 = x_1 - b = x_1 - \frac{f(x)}{f^\prime(x)}
$$

Thus the general formula for improving our guess $x_n$ to a better guess $x_{n+1}$ is
$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
$$

Now lets have some fun! firstly lets see how to compute $\sqrt a$<br/>
we need to construct a function that is zero at $\sqrt a$, lets use $f(x) = x^2 - a$<br/>
calculus tells us $f^\prime(x) = 2x$. we can use our formula now!

$$
x_{n+1} = x - \frac{x^2 - a}{2x} = x - \frac{x - \frac{a}{x}}{2}
$$

Awesome! lets try this in python
```py
def improve(g, a):
  return g - (g - a/g) / 2

g = 1             # initial guess
g = improve(g, 2) # g = 1.5
g = improve(g, 2) # g = 1.416666666666
g = improve(g, 2) # g = 1.414215686274
g = improve(g, 2) # g = 1.414213562374
```
After 4 iterations we're already correct to 12 decimal places! newton's method converges quickly, since as we approach the root our linear approximation becomes better and better. since $x^2$ is a line as you zoom in.

