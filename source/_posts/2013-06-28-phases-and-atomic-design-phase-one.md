---
layout: post
title: 'Phases and Atomic Design: Phase One'
---
As a follow up to my recent post on [Phases (and Mesophases) - a possible addendum to Atomic Design](/2013/06/atomic-design-phases-and-mesophases) I recently released the first addition to [Brad Frost's Pattern Lab](https://github.com/bradfrost/patternlab) to allow quick switching between defined breakpoints.

## The first release includes:

*   Basic feature to traverse /css/scss folder structure  and find Sass variables prefixed `$bp-`, then render as a 'Phases' tab  in the menu bar, using remainder of variable name and value for control  e.g. `$bp-small` becomes 'SMALL &gt;'; 24em.
*   Basic support provided for detecting whether `px` or `em` value has been specified.

## To-do:

*   Provide configuration to allow user to set pattern to match variable name on.
*   Possibly order the options based on size rather than order of declaration.
*   Confirm this works with `.sass` as well as `.scss`.
*   Deal with other browser units of measure.

[Check out the release on GitHub](https://github.com/benedfit/patternlab) and [let me know what you think via Twitter](https://twitter.com/benedfit).

## UPDATE

Brad's updated [patternlab.bradfrostweb.com](http://patternlab.bradfrostweb.com/) with my first release. So try it out!

## UPDATE #2 ##

[Dave Olsen has given Pattern Lab an overhaul](http://dmolsen.com/) and a new version of 'Phases' is waiting in the wings. [Check it out on GitHub](http://github.com/pattern-lab/).