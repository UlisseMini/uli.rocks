title: Polynomial interpolation
subtitle: From scratch, using gaussian elimination
thumb: poly.png
date: 2020-12-19


Click to add points

<canvas id="canvas" width=400 height=400></canvas>
<script src="/js/poly/tensor.js"></script>
<script src="/js/poly/poly.js"></script>

You can break it by choosing two points on the same virtical line, or picking too many points.

## How it works

Say you have points `[(1,2), (3,2), (4,5)]`
And say you want to find a quadratic which goes through these points.

This is the same as the system of equations
```
a(1^2) + b(1) + c = 2
a(3^2) + b(3) + c = 2
a(4^2) + b(4) + c = 5
```

Expressed in linear algebra this becomes
```
# each row is [1, x, x^2] for each x in points
# (backwards order makes evaluation easier in code)
A = [[1 1 1]
     [1 3 9]
     [1 4 16]]

b = [2, 2, 5] # what we want (y values for points)
x = [a, b, c] # unknowns, what we're solving for
```

Then you can use elimination to solve `Ax = b`, as I've done [here](https://github.com/ulissemini/poly).

## Efficiency

There are much more sophisticated techniques like the [Fast Fourier transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform) which is `O(n log n)`, while elimination is `O(n^3)`

