---
---
var posts = [{% for post in site.posts %}{% include post.json %},{% endfor %}],
index = lunr(function () {
	this.field('title', 10);
	this.field('content');
}), entries;

for (var post in posts) {
	index.add(posts[post]);
}

$(function () {
	$('#header').removeClass('hide-search');
	
	$('#search button').click(function (e) {
		e.preventDefault();
		search();
	});
	
	$("#search input").keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			search();
		}
	});
})

function search () {
  var results = $.map(index.search($("#search input").val()), function (result) {
  	return $.grep(posts, function (entry) { 
  		return entry.id === result.ref 
  	})[0];
  }),
  $container = $('#content'),
  template = Mustache.compile($('#search-results-template').html());
  
  $container.empty();
  
  if (results && results.length > 0) {
  	$container.append(template({ posts: results }));
  }
}