---
layout: post
date: 2015-06-08
permalink: /2015/06/refactoring-switch-statements-to-reduce-cyclomatic-complexity/
title: Refactor switch statements to reduce cyclomatic complexity
metaDescription: How to stop JSHint bugging you about the cyclomatic complexity of JavaScript switch statements by using a hash table
---
The concept of [cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity) is pretty new to me, and when faced with JSHint errors regarding it in the past I've been mostly likely to take the easy way out and skipped over the problem by [bumping the maximum complexity](http://jshint.com/docs/options/#maxcomplexity). But when faced with a complex switch statement used to add [support for directives](https://github.com/benedfit/stylperjade#directives) to [Stylperjade 1.2](https://github.com/benedfit/stylperjade#) I decided to solve the problem properly by using a hash table instead.

## The problem

The following function has a high cyclomatic complexity:

```js
function parseDirective(directive) {
  switch (directive.name) {
    case 'whitelist':
      options.cssWhitelist.push(directive.value)
      options.jadeWhitelist.push(directive.value)
      break
    case 'csswhitelist':
      options.cssWhitelist.push(directive.value)
      break
    case 'jadewhitelist':
      options.jadeWhitelist.push(directive.value)
      break
    case 'blacklist':
      options.cssBlacklist.push(directive.value)
      options.jadeBlacklist.push(directive.value)
      break
    case 'cssblacklist':
      options.cssBlacklist.push(directive.value)
      break
    case 'jadeblacklist':
      options.jadeBlacklist.push(directive.value)
      break
  }
}
```

## The solution

Refactor the function to make use of a hash table:

```js
var directives =
  { whitelist: function (directive) {
      directives.csswhitelist(directive)
      directives.jadewhitelist(directive)
    }
  , csswhitelist: function (directive) {
      options.cssWhitelist.push(directive.value)
    }
  , jadewhitelist: function (directive) {
      options.jadeWhitelist.push(directive.value)
    }
  , blacklist: function (directive) {
      directives.cssblacklist(directive)
      directives.jadeblacklist(directive)
    }
  , cssblacklist: function (directive) {
      options.cssBlacklist.push(directive.value)
    }
  , jadeblacklist: function (directive) {
      options.jadeBlacklist.push(directive.value)
    }
  }

function parseDirective(directive) {
  var isDirective = directives[directive.name]
  if (isDirective) {
    return isDirective(directive)
  }
  return null
}
```
