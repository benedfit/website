---
layout: post
title: 'Authoring critical above-the-fold CSS'
metaDescription: 'TBC'
excerpt: >
  [Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/)
  and my web pages; it was a match made in heaven, until things changed... PageSpeed
  started telling me I needed to optimise my CSS delivery, that my CSS files were
  render-blocking, that none of the above-the-fold content of my page could render
  without waiting for those files to load, and that I should in-line the critical
  portions of those files directly into my HTML.
---
> This was originally posted on [CSS-Tricks](http://css-tricks.com/TBC) on July
> 0, 2014

{{ page.excerpt }} <q>Go home PageSpeed,</q> I cried, <q>who in their right mind
wants a mass of CSS in their HTML? I'm a legitimate professional, I have a work-flow
don't you know? I couldn't possible be seen to advocate FOUTing</q> I scoffed.

This had long been my stand point until I read the following tweet:

> <q>I'd like to see a site like CSS Zen Garden, but where developers try to make
> the same responsive site score better on [webpagetest.org](http://webpagetest.org)</q>
> <cite>[Scott Jehl](https://twitter.com/scottjehl/statuses/477112692684390400)
> <time>June 12, 2014</time></cite>

I've long committed myself to getting my web pages the best possible scores
from webpagetest.org, and that required a change of work-flow, so why shouldn't
I change it for PageSpeed?.. Now if you're already
using [Google's mod_pagespeed module](https://developers.google.com/speed/pagespeed/module?csw=1)
put your feet up and give yourself a pat on the back as
[the module has you covered](https://developers.google.com/speed/pagespeed/module/filter-prioritize-critical-css).
For those of you, like myself, who aren't, here's how I went about it:

## Here comes the science part...

To solve the problem I first needed to understand what PageSpeed was telling me.
External stylesheets (read those included via `link` tags) are render-blocking.
This means that the browser won't paint content to the screen until all of your
CSS has been downloaded. Couple this with the fact that if the amount of data
required to render the page exceeds the initial congestion window (typically 14.6kB
compressed) it will required additional round trips between the server and the
user's browser. This all adds up to additional network latency, and for users on
high latency networks, such as mobile, can cause significant delays to page
loading.

PageSpeed's recommendation is to split your CSS into two parts; an in-line part
that's responsible for styling the above-the-fold portion of the
content, and the rest, which can be deferred. Now before we get hung up on
whether the fold exists or not, let's just agree that anything we can do to get
our data to our users as quickly as possible is a good thing, right?

## Determining what's critical

Determining which portions of our CSS are critical required
inspecting my web pages at 'mobile' and 'desktop' sizes, then taking a snapshot of
the CSS rules applied to the elements visible in the viewport. This seemed like
a daunting task, but fear not, some very smart people were there to help:

* [Paul Kinlan](https://twitter.com/Paul_Kinlan) has created a
[bookmarklet/Chrome devtools snippet](https://gist.github.com/PaulKinlan/6284142)
to aid in the process
* [as too has Scott Jehl](https://gist.github.com/scottjehl/b6129da04733e4e0f9a4)
* Penthouse by [Jonas Ohlsson](https://twitter.com/pocketjoso) is available as a
[Node module](https://github.com/pocketjoso/penthouse) a
[Grunt task](https://github.com/fatso83/grunt-penthouse) and as
[an on-line tool](http://jonassebastianohlsson.com/criticalpathcssgenerator/)

Armed with the results of the inspection process I now need to modify my HTML to
load my CSS in a non-render-blocking way.

## Asynchronously loading CSS

Let's imagine that one of my HTML documents was as follows:

{% highlight html %}
<html>
  <head>
    <link rel="stylesheet" href="things.css">
  </head>
  <body>
    <div class="thing1">
      Hello world, how goes it?
    </div>
    ...
    <div class="thing2">
      Hey, I'm totally below-the-fold
    </div>
  </body>
</html>
{% endhighlight %}

And that `things.css` contained the following:

{% highlight css %}
.thing1 { color: red; }
.thing2 { background: green; }
{% endhighlight %}

Using the results of the inspection process I can now in-line the critical,
above-the-fold, portion of my CSS in the `head` like so:

{% highlight html %}
<html>
  <head>
    <style>
      .thing1 { color: red; }
    </style>
  </head>
  <body>
    <div class="thing1">
      Hello world, how goes it?
    </div>
    ...
{% endhighlight %}

Then using [Filament Group's loadCSS](https://github.com/filamentgroup/loadCSS)
I can asynchronously load the remaining below-the-fold CSS like this:

{% highlight html %}
    ...
    <div class="thing2">
      Hey, I'm totally below-the-fold
    </div>
    <script>
      /*!
      Modified for brevity from https://github.com/filamentgroup/loadCSS
      loadCSS: load a CSS file asynchronously.
      [c]2014 @scottjehl, Filament Group, Inc.
      Licensed MIT
      */
      function loadCSS(href){
        var ss = window.document.createElement('link'),
            ref = window.document.getElementsByTagName('head')[0];

        ss.rel = 'stylesheet';
        ss.href = href;

        // temporarily, set media to something non-matching to ensure it'll
        // fetch without blocking render
        ss.media = 'only x';

        ref.parentNode.insertBefore(ss, ref);

        setTimeout( function(){
          // set media back to `all` so that the stylesheet applies once it loads
          ss.media = 'all';
        },0);
      }
      loadCss('thing2-only.css');
    </script>
  </body>
</html>
{% endhighlight %}

