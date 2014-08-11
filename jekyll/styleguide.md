---
layout: default
title: 'Style guide'
metadescription: 'Examples of all the styles in use on my site'
permalink: /styleguide/
inmenu: true
hidden: true
---
# Styleguide

<section markdown="1">
## Headings

<section markdown="1">
# Heading level 1 [link](#)

## Heading level 2 [link](#)

### Heading level 3 [link](#)

#### Heading level 4 [link](#)

##### Heading level 5 [link](#)

###### Heading level 6 [link](#)
</section>
</section>

## Horizontal rule

---

## Lists

* This is a list item in an unordered list [link](#)
* An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.
* Lists can be nested inside of each other
  * This is a nested list item
  * This is another nested list item in an unordered list
* This is the last list item

1.  This is a list item in an ordered list [link](#)
2.  An ordered list is a list in which the sequence of items is important. An ordered list does not necessarily contain sequence characters.
3.  Lists can be nested inside of each other
  1.  This is a nested list item
  2.  This is another nested list item in an ordered list
4.  This is the last list item

## Text

A paragraph (from the Greek paragraphos, <q>to write beside</q> or <q>written beside</q>) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.

> A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text, and typically distinguished visually using indentation and a different typeface or smaller size quotation.
> <cite>[link](#)</cite>

> <q>Example of block quote with quotes</q>
> <cite>Example cite</cite>

[This is a text link](#)

**Strong is used to indicate strong importance**

*This text has added emphasis*

The <b>b element</b> is stylistically different text from normal text, without any special importance

The <i>i element</i> is text that is set off from the normal text

The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation

<del>This text is deleted</del> and <ins>This text is inserted</ins>

<s>This text has a strikethrough</s>

Super<sup>script</sup>

Sub<sub>script</sub>

<small>This small text is small for fine print, etc. [link](#)</small>

Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>

Keybord input: <kbd>Cmd</kbd>

<q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation. <q>With another quotation inside it.</q></q>

<cite>This is a citation</cite>

The <dfn>dfn element</dfn> indicates a definition.

The <mark>mark element</mark> indicates a highlight

<samp>This is sample output from a computer program</samp>

The <var>variable element</var>, such as <var>x</var> = <var>y</var>

A timestamp, such as <time datetime="2014-01-01T00:00:00+00:00"><a href="#" rel="directory">January</a> 1, <a href="#" rel="directory">2014</a></time>

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

<pre>P R E F O R M A T T E D T E X T P R E F O R M A T T E D T E X T
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~</pre>

`<div class="example">This is what inline code looks like.</div>`

{% highlight html %}
<script>
  // This is what a hightlighted code block looks like
  // Sample script
  window.console && console.log('foo');
  var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
</script>
<style>
  /* Sample style */
  .sample{
    background:url(none);
    content:"test";
    margin:0 !important;
  }
</style>
<div>
  <!-- Sample HTML -->
  <p class=".sample">This is an sample pattern</p>
</div>
{% endhighlight %}