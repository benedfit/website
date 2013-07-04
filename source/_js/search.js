//= require libs/jquery
//= require libs/lunr
//= require libs/mustache

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
	$.getJSON("/posts.json", function(data){
		var index = lunr(function () {
				this.field('title', 10);
				this.field('content');
			}),
			posts = data.posts,
			$container = $('#content'),
  			template = Mustache.compile($('#search-results-template').html()),
  			result;
	    
	    for (var post in posts) {
			index.add(posts[post]);
		}
		
		results = $.map(index.search($("#search input").val()), function (result) {
   			return $.grep(posts, function (entry) {
   				return entry.id === result.ref;
   			})[0];
  		});
  
  		$container.empty();
  
  		if (results && results.length > 0) {
   			$container.append(template({ posts: results }));
  		}
	});
}