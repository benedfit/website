<?php if(!defined('IN_GS')){ die('you cannot load this page directly.'); } ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php get_site_name(); ?></title>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="author" href="/humans.txt">
		<link rel="stylesheet" href="/css/base.css" media="all">
		<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png">
		<link rel="icon" href="/favicon.png">
        <!--[if IE]><link rel="shortcut icon" href="/favicon.ico"><![endif]-->
        <meta name="msapplication-TileColor" content="#000000">
        <meta name="msapplication-TileImage" content="/tileicon.png">
	</head>
	<body>
		<div id="master">
			<div class="master-container">
				<header id="header"><a id="logo" href="/">Benedfit</a></header>
				<div id="content">
					<nav id="navigation">
						<a href="mailto:hello@benedfit.com" data-icon="&#x65;"><span>Email me at hello@benedfit.com</span></a>
						<a href="tel:+447563167652" data-icon="&#x6d;"><span>Call me on +44 7563 167652</span></a>
						<a href="https://twitter.com/benedfit" data-icon="&#x21;"><span>Follow me on Twitter</span></a>
					</nav>	
				</div>
				<footer id="footer">&copy; <a href="/">Ben Edwards</a>. All rights reserved.</footer>
			</div>
		</div>
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-34470231-1']);
		  _gaq.push(['_setDomainName', 'benedfit.com']);
		  _gaq.push(['_trackPageview']);		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
	</body>
</html>