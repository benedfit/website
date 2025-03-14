---
layout: post
date: 2013-06-05
permalink: /2013/06/atomic-design-phases-and-mesophases/
title: Phases (and Mesophases) - a possible addendum to Atomic Design
metaDescription: Thoughts on the use of Phases and Mesophases as an addendum to Atomic Design, to describe breakpoints and tweakpoints
---
This Monday I had the absolute pleasure of attending [Brad Frost](http://bradfrost.com/)'s _Reasons to be Responsive_ workshop ([Recap by Jake Ryan](http://www.jrayson.co.uk/blog/130603-reasons-to-be-awesome)). Among the 8 'awesome' hours of RWD gold, Brad introduced us to [Atomic Design](http://bradfrost.com/blog/link/atomic-design/), a modular approach to responsive design and development, and his brand new tool [Pattern Lab](http://patternlab.bradfrostweb.com/) for forging websites using the Atomic Design approach.

One of the other topics during the day was inevitably the art of selecting breakpoints, and more importantly for this post, the naming of the Sass variables for these breakpoints, and how said names could be tied into Atomic Design.

## Introducing... Phases

I love a good science analogy, so following along the matter-based naming convention of Atomic Design, I settled upon [Phases](http://en.wikipedia.org/wiki/Phase_%28matter%29) as a suitable term. In physics the term phase is sometimes used as a synonym for states of matter (this being another term that I considered using, until I learned of [mesophases](http://en.wikipedia.org/wiki/Mesophase), but I'll get onto that shortly), which you may remember from GSCE physics being: solid, liquid, gas, and a new one to me, plasma.

So I started experimenting with using Phases as a way to name my Sass variables, which lead to such examples as `$bp-small: 24em;` becoming `$phase-first: 24em;` and `$bp-med: 46.8em;` becoming `$phase-second: 46.8em;`.

> <q>That's all very well and good Ben, by what about [tweakpoints](http://adactio.com/journal/6044/)</q>
> <cite>Someone, somewhere</cite>

I hear you... That's where [Mesophases](http://en.wikipedia.org/wiki/Mesophase) come along. In physics, a mesophase is a state of matter intermediate between liquid and solid.

I envisage Phases as a way to describe when the layout of a page changes significantly, for example, if it changes from a one column to multi-column layout. Mesophases, on the other hand, would be the changes between those significant changes, for example, tweaking the font-size of the nav to make it fit more comfortablly.

As these  are changes affecting Atomic Design organisms, molecules, or even atoms, I feel it's best to name the associated Sass variables accordingly. So what once might have been `$bp-small-2: 29.75em;` could become `$mesophase-nav-first: 29.75em;`.

##  What next?

One of Brad's key aims for Pattern Lab is that he doesn't want to dictate naming conventions and development styles, and I'm keen to stick to that plan. So if you don't like the idea of Phases and Mesophases, please do ignore these musing. However, my plan is to take my fork of Pattern Lab, and work out how Phases and Mesophases can be automatically added to the UI directly by looking for them in .scss files, and provide users with the means to scale the display to the necessary dimensions to view them.

Please feel free to share your thoughts with me on [Twitter](https://twitter.com/benedfit).
