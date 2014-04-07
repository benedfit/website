//= require js/libs/jquery
//= require js/libs/purl
//= require js/libs/lunr
//= require js/libs/mustache

$(function() {
	var q = $.url().param('q');
	
	if (q) {
		$('#search input').val(q);
		search();
	}
});

function search() {
	$.getJSON("/posts.json", function(data) {
		var index = lunr(function() {
			this.field('title', 10);
			this.field('content');
		}), posts = data.posts, $container = $('#content-container'), template = Mustache.compile($('#search-results-template').html()), result;

		for (var post in posts) {
			index.add(posts[post]);
		}

		results = $.map(index.search($("#search input").val()), function(result) {
			return $.grep(posts, function (entry) {
			return entry.id === result.ref;
			})[0];
		});
		if (results && results.length > 0) {
			$container.empty().append(template({
				posts : results
			}));
		}

		$container.focus();
	});
}