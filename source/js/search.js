---
---
var docs = [{% for post in site.posts %}{% include post.json %},{% endfor %}],
idx = lunr(function () {
	this.field('title', 10);
	this.field('content');
});

for (var index in docs) {
	idx.add(docs[index]);
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
  var result = idx.search($("#search input").val());
  if (result && result.length > 0) {
    window.location.replace(result[0].ref);
  }
}