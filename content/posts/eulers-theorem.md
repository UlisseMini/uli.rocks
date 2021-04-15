title: Eulers Theorem
subtitle: Groups make it easy
thumb: euler-totient.png
date: 2021-04-15


This is euler's theorem (for coprime n and k)
```tex
k^{\phi(n)} \equiv 1 \pmod n
```

## Key fact

The integers coprime to n, mod n forms a [group](https://www.wikiwand.com/en/Group_(mathematics)).
therefor multiplication by `$k` must be invertible (since k is coprime to n, and k is in the group).

Example:
```tex
3(1 \cdot 3 \cdot 5 \cdot 7) \equiv 3 \cdot 1 \cdot 7 \cdot 5 \pmod 8
```


## The Proof
So if we have `$\{k_1, \dots, k_{\phi(n)}\}` being the integers coprime to n.

We know `$k` is in the set (since n and k are coprime).
if we multiply each `$k_i` by `$k` we have

```tex
\prod^{\phi(n)} k_i \equiv \prod^{\phi(n)} k_i k \pmod n
```

Recall each multiplication by k is invertible, so we're just reordering the elements. that's why they're equal.

Now we factor out k and invert/divide by the product (which will just be another k)
```tex
1 \cdot \bcancel{\prod^{\phi(n)} k_i} \equiv k^{\phi(n)} \bcancel{\prod^{\phi(n)} k_i} \pmod n
```
So we end up with
```tex
k^{\phi(n)} \equiv 1 \pmod n
```

## Proof it is a group

There are 3 group axioms we must satisfy
1. An identity element, just `$1` in our case
2. Associativity, multiplication is associative
3. Invertibility, this interesting one (see below)

Let `$k` be an element of the group,
we know that `$\gcd(k, n) = 1` (coprime)

Euclids algorithm implies there exist `$s` and `$t` such that
```tex
sk + tn = 1
```
(Also known as [Bézout's identity](https://www.wikiwand.com/en/B%C3%A9zout%27s_identity))

Now subtract `$tn` from both sides and then modulo by `$n`

```tex
sk = 1 - tn \implies sk \equiv 1 \pmod n
```
Therefor `$s = k^{-1}`, an inverse exists!

