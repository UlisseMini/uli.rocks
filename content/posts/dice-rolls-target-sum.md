title: Dice rolls with target sum
subtitle: More generating functions
date: 2021-06-01
draft: true


Doing this [leetcode](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/)
Fun fact: my first approach to this about a month ago was $O(n!)$ with recursion, lets see if I can do better this time.

Let $d$ be the number of dice rolls, $f$ be the number of faces and $t$ be the target sum.

We want to find the coefficient of the $x^t$ term in
$$
\left(\sum_{i=1}^f x^i\right)^d = x^d \left(\sum_{i=0}^{f-1} x^i\right)^d = x^d\left(\frac{x^f - 1}{x - 1}\right)^d
$$

Our problem is now reduced to finding the $t-d =: k$ coefficient in
$$
\left(\frac{x^f - 1}{x - 1}\right)^d
$$



