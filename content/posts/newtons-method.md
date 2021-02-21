title: Newton's Method
subtitle: Finding roots of functions
thumb: newtons-method.png
date: 2021-02-21


Let's say we want to find `$f(x) = 0` for some function, where solving explicitly is impossible. but you can evaluate `$f(x)` and `$f^\prime(x)`

You might come up with the clever idea of approximating `$f(x)` by a tangent line, then finding where the line hits zero.

<iframe src="https://www.desmos.com/calculator/fayhfuft5b?embed" width="600px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

`$\frac{f(x_1)}{f^\prime(x_1)}` is the base because derivative is slope, which gives us
```tex
f'(x) = \frac{f(x)}{b} \implies b = \frac{f(x)}{f'(x)}
```

Intuitively `$\frac{dx}{dy} f(x_1)`, is converting some change in Y to the corresponding change in X.
Using this we can now find `$x_2` using `$b`
```tex
x_2 = x_1 - b = x_1 - \frac{f(x)}{f^\prime(x)}
```

Thus the general formula for improving our guess `$x_n` to a better guess `$x_{n+1}` is
```tex
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
```

