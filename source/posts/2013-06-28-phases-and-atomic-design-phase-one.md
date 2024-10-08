---
layout: post
date: 2013-06-28
permalink: /2013/06/phases-and-atomic-design-phase-one/
title: 'Phases and Atomic Design: Phase one'
metaDescription: The initial implementation of Phases in the Atomic Design System, Pattern Lab, to show defined breakpoints and tweakpoints
---
As a follow up to my recent post on [Phases (and Mesophases) - a possible addendum to Atomic Design](/2013/06/atomic-design-phases-and-mesophases/) I recently released the first addition to [Brad Frost's Pattern Lab](https://github.com/bradfrost/patternlab) to allow quick switching between defined breakpoints.

## The first release includes:

*   Basic feature to traverse /css/scss folder structure  and find Sass variables prefixed `$bp-`, then render as a 'Phases' tab  in the menu bar, using remainder of variable name and value for control  e.g. `$bp-small` becomes <mark>Small > 24em</mark>.
*   Basic support provided for detecting whether `px` or `em` value has been specified.

## To-do:

*   Provide configuration to allow user to set pattern to match variable name on.
*   Possibly order the options based on size rather than order of declaration.
*   Confirm this works with `.sass` as well as `.scss`.
*   Deal with other browser units of measure.

## Update

Brad's updated [patternlab.bradfrostweb.com](http://patternlab.bradfrostweb.com/) with my first release. So try it out!

## Update #2

[Dave Olsen has given Pattern Lab an overhaul](http://dmolsen.com/) and a new version of 'Phases' is waiting in the wings. [Check it out on GitHub](https://github.com/pattern-lab/).
