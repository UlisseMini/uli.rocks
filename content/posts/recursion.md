title: Recursion abuse
date: 2021-02-16


I hate when people introduce recursion with something like this
```py
def fib(n):
  if n <= 1: return n
  return fib(n - 1) + fib(n - 2)

fib(6)  # => 8
fib(35) # => 9227465
```

If you run this code yourself, you'll notice `fib(35)` takes a long time to run, that's because fib gets called 29860703 times to compute `fib(35)`. which is exponential complexity! `~O(2^n)`


Nobody should be taught recursion like this, the correct way to write `fib(n)` is
```py
def fib(n):
  if n <= 1: return n
  prev, curr = 1, 1
  for _ in range(n - 2):
    prev, curr = curr, prev+curr
  return curr
```

Harder to understand? Yes, but this is `O(n)`. so we can compute `fib(100_000)` in an instant.

The real time you use recursion is for traversing some kind of tree, ie. in [minimax](https://en.wikipedia.org/wiki/Minimax#Pseudocode) for solving tictactoe (psudocode)

```py
# minimax gives the value of a board state, assuming perfect play
def minimax(board) -> float:
  if board.game_over():
    return board.result() # X win = 1, O win = -1, tie = 0

  if board.side_to_move == X:
    # we are X, we want to maximize the result
    return max(minimax(child) for child in board.children())
  else:
    # we are O, we want to minimize the result
    return min(minimax(child) for child in board.children())

```

Stop recursion abuse!
