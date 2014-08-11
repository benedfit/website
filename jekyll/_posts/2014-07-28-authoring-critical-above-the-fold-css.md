---
layout: post
title: Authoring critical above-the-fold CSS
metadescription: Authoring critical above-the-fold CSS, and asynchronously loading none render-blocking CSS
excerpt: >
  [Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/) and my web pages; it was a match made in heaven, until things changed... PageSpeed started telling me I needed to optimise my CSS delivery, that my CSS files were render-blocking, that none of the above-the-fold content of my page could render without waiting for those files to load, and that I should in-line the critical portions of those files directly into my HTML.
---
> [This was originally posted on CSS-Tricks on July 14, 2014](http://css-tricks.com/authoring-critical-fold-css/). [Chris Coyier](https://twitter.com/chriscoyier) invited me to write a piece [after I shared this gist](https://gist.github.com/benedfit/46da533805566141c42f), that led me down a rabbit hole to this article.

{{ page.excerpt }} <q>Go home PageSpeed,</q> I cried, <q>who in their right mind wants a mass of CSS in their HTML? I'm a legitimate professional, I have a work-flow don't you know?</q> I scoffed.

This had long been my stand point until I read the following tweet:

> <q>I'd like to see a site like CSS Zen Garden, but where developers try to make the same responsive site score better on [webpagetest.org](http://webpagetest.org)</q>
> <cite>[Scott Jehl](https://twitter.com/scottjehl/statuses/477112692684390400) <time>June 12, 2014</time></cite>

I've long committed myself to getting my web pages the best possible scores from webpagetest.org, and that required a change of work-flow, so why shouldn't I change it for PageSpeed?.. Now if you're already using [Google's mod_pagespeed module](https://developers.google.com/speed/pagespeed/module?csw=1) put your feet up and give yourself a pat on the back as [the module has you covered](https://developers.google.com/speed/pagespeed/module/filter-prioritize-critical-css). For those of you, like myself, who aren't, here's how I went about it:

## Here comes the science part...

To solve the problem I first needed to understand what PageSpeed was telling me. External stylesheets (read those included via `link` tags) are render-blocking. This means that the browser won't paint content to the screen until all of your CSS has been downloaded. Couple this with the fact that if the amount of data required to render the page exceeds the initial congestion window (typically 14.6kB compressed) it will required additional round trips between the server and the user's browser. This all adds up to additional network latency, and for users on high latency networks, such as mobile, can cause significant delays to page loading.

PageSpeed's recommendation is to split your CSS into two parts; an in-line part that's responsible for styling the above-the-fold portion of the content, and the rest, which can be deferred. Now before we get hung up on whether the fold exists or not, let's just agree that anything we can do to get our data to our users as quickly as possible is a good thing, right?

## Determining what's critical

Determining which portions of our CSS are critical required inspecting my web pages at 'mobile' and 'desktop' sizes, then taking a snapshot of the CSS rules applied to the elements visible in the viewport. This seemed like a daunting task, but fear not, some very smart people were there to help:

* [Paul Kinlan](https://twitter.com/Paul_Kinlan) has created a [bookmarklet/Chrome dev tools snippet](https://gist.github.com/PaulKinlan/6284142) to aid in the process
* [as too has Scott Jehl](https://gist.github.com/scottjehl/b6129da04733e4e0f9a4) which is also available as a [Node module](https://github.com/filamentgroup/criticalcss) and as a [Grunt task](https://github.com/filamentgroup/grunt-criticalcss)
* Penthouse by [Jonas Ohlsson](https://twitter.com/pocketjoso) is available as a [Node module](https://github.com/pocketjoso/penthouse) a [Grunt task](https://github.com/fatso83/grunt-penthouse) and as [an on-line tool](http://jonassebastianohlsson.com/criticalpathcssgenerator/)

Armed with the results of the inspection process I now need to modify my HTML to load my CSS in a none render-blocking way.

## An asynchronously load off my mind

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

Using the results of the inspection process I can now in-line the critical, above-the-fold, portion of my CSS in the `head` like so:

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

Pair this with [Filament Group's loadCSS](https://github.com/filamentgroup/loadCSS) and I can asynchronously load the remaining below-the-fold CSS like this:

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
      loadCss('things.css');
    </script>
    <noscript>
      <!-- Let's not assume anything -->
      <link rel="stylesheet" href="things.css">
    </noscript>
  </body>
</html>
{% endhighlight %}

## A work-flow for the future

Excellent news! PageSpeed is elated! It no longer complains of render-blocking CSS and is satisfied that above-the-fold content has been given the priority it deserves, but in this modern world of CSS preprocessors and front-end tooling a manual process like the one above just isn't going to hack it...

### An automated approach

... Those of you looking for an automated mod_pagespeed style approach, and also familiar with Node (Apologies to those who aren't, but here at [Clock it's a massive part of everything we do](http://clock.co.uk/)) will definitely want to look into [Penthouse](https://github.com/pocketjoso/penthouse) and [Addy Osmani's](https://twitter.com/addyosmani) [experimental Node module, Critical](https://github.com/addyosmani/critical), both of which provide means for in-lining or manipulating critical CSS as determined via the PageSpeed API. Now while a fully automated work-flow sounds like heaven the one thing that irks me with the current tools is that they don't take address the fact that any CSS rules that are in-lined are served again once the below-the-fold CSS is downloaded. And in the spirit of sending as little data as needed to our users, this feels like an unnecessary duplication.

### CSS preprocessors to the rescue

Making use of your favourite CSS preprocessor for authoring above and below-the-fold CSS seems like a no-brainer to me and is something the Front-end team is currently experimenting with at Clock.

New projects lend themselves very well to this approach, and critical and non-critical CSS could be authored via some well structured `@import` rules:

{% highlight scss %}
// critical.scss - to be in-lined
@import "header";
{% endhighlight %}

{% highlight scss %}
// non-critical.scss - to be asynchronously loaded
@import "web-fonts";
@import "footer";
{% endhighlight %}

Should your partials not lend themselves to this sort of structuring, [Team Sass's conditional styles Compass plug-in Jacket](https://github.com/Team-Sass/jacket) can come in very handy. For example if your partial `_shared.scss` contained rules for both above and below-the-fold elements, the critical and non-critical rules could be wrapped by Jacket like so:

{% highlight scss %}
@include jacket(critical) {
  .header{
    color: red;
  }
}

@include jacket(non-critical) {
  @include font-face(...);
  ...

  .footer{
    color: blue;
  }
}
{% endhighlight %}

Then `critical.css` and `non-critical.css` could be edited as follows to result in the same CSS:

{% highlight scss %}
// critical.scss - to be in-lined
$jacket: critical;
@import "shared";
{% endhighlight %}

{% highlight scss %}
// non-critical.scss - to be asynchronously loaded
$jacket: non-critical;
@import "shared";
{% endhighlight %}

This approach also feels in-keeping with the way lots of the community is authoring media queries at a component level rather than in a global location, and could feasible be used to define critical and non-critical CSS rules at a component level.

## We're still working this stuff out

While the [update to the web version of PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights_extensions) is almost a year old now, I feel that the topic of critical CSS and prioritising above-the-fold content has only gained significant traction in the past few months. I hope by giving you and insight into the way I've handle its authoring will entice you into incorporate it into your work-flow. And make sure to keep a weather eye on the tools outline above, as most are in the early stages of development and I expect exciting changes ahead.