---
layout: post
date: 2015-06-09
permalink: /daily-battles-won-in-the-war-on-regex-1/
title: Daily battles won in the war on regular expressions - Vol. 1
metaDescription: The first in a series of posts where I, or more than likely someone else, manages to write a killer regular expression
---
I'm not too hot when it comes to regular expressions, so I've decided to document every battle won, however big or small, in my war on regular expressions.

## The problem

Parse the following snippet of Stylus and remove all the comments, while ignoring all the glob patterns in the `@require` statements, to fix [this issue with Stylint](https://github.com/rossPatton/stylint/issues/110):

```styl
/* 'aa/' */

/*!test*/

/* someone said 'hello' */

/* "hello"*/

/***test****/

/******
'test'
****/

/****
test
****/

// let's try a single quote here "test"

/*
test
*/

/*'test'*/

/*
     test
*/

/*
  'test ' */

/** @require 'aa/*' */

.test
  content ''/* test */

@require 'aaa/*'

@require 'bbb/*' /* test */

@require 'ccc/*'

@require 'ccc/* ab */' /* test */

@require 'ddd/*' /*test  '*/
@require "ddd/*" /*test  '*/

@require 'eee/*'
// test again

@require 'fff/*'

@require 'ggg/*'


@require 'hhh/*'


@require 'iii/*'

@require 'jjj/*' /* test */

@require 'kk/**/*'
```

## The other-worldly solution from [Kuba Stawiarski](https://github.com/kuba81))

```js
/\G[^"'\/]*(?:'[^']*'|"[^"]*"|\/\/[^\r\n]+|\/[^*]|(\/\*(?:.|\r|\n)*?\*\/))/g
```

[Check out why it works, and what it matches](https://regex101.com/r/zM0xA6/)
