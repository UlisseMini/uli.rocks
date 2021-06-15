# Design

This is mostly written for myself so I can stay consistent.

I'll add linters later.

## CSS
> Use classes like functions, inline styles when something isn't reusable.

Prefer inline `style=""` when something is one-off. but if there is a common pattern then make a utility class.

CSS is either applied to element tags, or styled inline via inline styles or utility classes. ie.
```css
code { color: #333; }  /* This is fine */
.code { color: #333; } /* This is not  */
```
And for other things
```css
.subtitle { font-size: 0.7rem; } /* Bad */
.small    { font-size: 0.7rem; } /* Better */
/* style="font-size: 0.7rem;" */ /* Best */
```

I think this reduces cognitive strain by changing [dependency direction](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/).


