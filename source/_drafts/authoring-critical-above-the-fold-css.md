---
layout: post
title: 'Authoring critical above-the-fold CSS'
metaDescription: 'TBC'
excerpt: >
  [Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/)
  and my web pages; it was a match made in heaven, until things changed... PageSpeed
  started telling me I needed to optimise my CSS delivery, that my CSS files were
  render-blocking, that none of the above-the-fold content of my page could render
  without waiting for those files to load, and that I should inline the critical
  portions of those files directly into my HTML.
---
> This was originally posted on [CSS-Tricks](http://css-tricks.com/TBC) on July
> 0, 2014

{{ page.excerpt }} <q>Go home PageSpeed,</q> I cried,<q> who in their right mind
wants a mass of CSS in their HTML? I'm a legitimate professional don't you know?
I couldn't possible be seen to FOUT</q> I scoffed.

This was my stand point until [Scott Jehl](https://twitter.com/scottjehl) tweeted:

> <q>I'd like to see a site like CSS Zen Garden, but where developers try to make
> the same responsive site score better on [webpagetest.org](http://webpagetest.org)</q>
> <cite>[Scott Jehl](https://twitter.com/scottjehl/statuses/477112692684390400)
> <time>June 12, 2014</time></cite>

## Here comes the science part...

External stylesheets (read those included via `link` tags) are render-blocking.
This means that the browser won't paint content to the screen until all of your
CSS has been downloaded. Couple this with the fact that if the amount of data
required to render the page exceeds the initial congestion window (typically 14.6kB
compressed) it will required additional round trips between your server and the
user's browser. This all adds up to additional network latency, and for users on
high latency networks, such as mobile networks, can cause significant delays to
page loading.

PageSpeed's recommendation is to split your CSS into two parts; an inline part
that's responsible for styling the above-the-fold portion of the
content, and the rest, which can be deferred. Now before we get hung up on
whether the fold exists or not, let's just agree that anything we can do to get
our data to our users as quickly as possible is a good thing, right?

So, if your HTML document was as follows:

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

And `things.css` contained the following:

{% highlight css %}
.thing1 { color: red; }
.thing2 { background: green; }
{% endhighlight %}

Then you can inline the critical, above-the-fold, portion of your CSS like so:

{% highlight html %}
<html>
  <head>
    <!-- Inline critical CSS -->
    <style>
      .thing1 { color: red; }
    </style>
  </head>
  <body>
    <div class="thing1">
      Hello world, how goes it?
    </div>
    ...
    <div class="thing2">
      Hey, I'm totally below-the-fold
    </div>
    <!-- Then asynchronously load below-the-fold CSS -->
    <script>
      function async(href){
        var ss = window.document.createElement('link'),
            ref = window.document.getElementsByTagName('head')[0];

        ss.rel = 'stylesheet';
        ss.href = href;
        ss.media = 'only x';

        ref.parentNode.insertBefore(ss, ref);

        setTimeout( function(){
          ss.media = 'all';
        },0);
      }
      async('thing2-only.css');
    </script>
  </body>
</html>
{% endhighlight %}