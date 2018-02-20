# Superpermutation Calculator

What is a super permutation?

An ordinary permutation is a shuffle. It is how many ways you can shuffle a set of values. The 3! (3x2x1) = 6 ways to shuffle.

A supermutation is a string of numbers that contains all the permutations contained within it.

This is an attempt to find the smallest string *by length, not value* that contains all the permutations within it. (Overlapping is ok)

More information:

[![Numberphile](http://img.youtube.com/vi/wJGE4aEWc28/0.jpg)](http://www.youtube.com/watch?v=wJGE4aEWc28)

An example:

Using 3!:

Permutations are:
* 123
* 132
* 213
* 231
* 312
* 321

Simple superpermutation (not considering length) which is just the concatenated string of all permutation values:

123132213231312321

So now what is the smallest string that contains all the permutations? Look at

123121321

This contains each of the permutations above (overlapping is ok) somewhere in the string. This is only 9 digits, and is the shortest superpermutation for 3!

What is the big deal:

No one can prove the shortest superpermutation of 6! . In fact, this script will likely not scale much beyond 3! . This is due to the exponential space of the problem set.

Usage:

```
$ ruby -r "./superpermutation.rb" -e "Superpermutation.pretty(2)"
Shortest string is '121'

$ ruby -r "./superpermutation.rb" -e "Superpermutation.pretty(3)"
Shortest string is '123121321'
```

Or in Node:

```
$ node -p "require('./superpermutation.js').pretty(2)"
Shortest string is '121'

$ node -p "require('./superpermutation.js').pretty(3)"
Shortest string is '123121321'
```

Testing:

Tests are written in minitest

```
ruby test/superposition_test.rb
```
