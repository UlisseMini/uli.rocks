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

Say you have points `$(1,2), (3,2), (4,5)`
And say you want to find a quadratic which goes through these points.

This is the same as the system of equations
```tex
\begin{cases}
  a(1^2) + b(1) + c = 2 \\
  a(3^2) + b(3) + c = 2 \\
  a(4^2) + b(4) + c = 5
\end{cases}
```

Expressed in linear algebra this becomes
```tex
\begin{bmatrix}1 & 1 & 1 \\ 1 & 3 & 9 \\ 1 & 4 & 16\end{bmatrix}
\begin{bmatrix}a \\ b \\ c\end{bmatrix}
= \begin{bmatrix}2 \\ 2 \\ 5\end{bmatrix}
```

Then you can use elimination to solve `$Ax = b`, as I've done [here](https://github.com/ulissemini/poly).

## Efficiency

Elimination is `$O(n^3)`, Realistically you should use `$O(n^2)` with Lagrange polynomials [wiki](https://en.wikipedia.org/wiki/Lagrange_polynomial), [video](https://youtu.be/B67wkZ3DWc0). (also related to how `$A` is a [Vandermonde matrix](https://en.wikipedia.org/wiki/Vandermonde_matrix#Using_polynomial_properties)).

But I like the generality of elimination :D

There are also much more sophisticated techniques, like the [Fast Fourier transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform) which (I think?) is `$O(n \log n)`. I don't understand it yet though.


