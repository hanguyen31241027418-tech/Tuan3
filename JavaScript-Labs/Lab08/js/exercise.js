function generateContinents() {
    for (var i = 0; i < continents.length; i++) {
        document.write('<li class="list-group-item"><a href="#">' + continents[i] + '</a></li>');
    }
}

function generateCountries() {
    for (var i = 0; i < countries.length; i++) {
        if (countries[i] == "Canada") {
            document.write('<li class="list-group-item active">' + countries[i] + '</li>');
        } else {
            document.write('<li class="list-group-item"><a href="#">' + countries[i] + '</a></li>');
        }
    }
}

function generatePost(post) {
    var html = '<div class="row">';
    html += '<div class="col-md-2">';
    html += '<a href="post.php?id=' + post.id + '"><img src="images/travel/' + post.thumb + '" alt="' + post.title + '" class="img-thumbnail"/></a>';
    html += '</div>';
    html += '<div class="col-md-10">';
    html += '<h2>' + post.title + '</h2>';
    html += '<div class="details">Posted by ' + post.user;
    html += '<span class="pull-right">' + post.postdate + '</span></div>';
    html += '<p class="excerpt">' + post.excerpt + '</p>';
    html += '<p><a href="post.php?id=' + post.id + '" class="btn btn-primary btn-sm">Read more</a></p>';
    html += '</div></div>';
    return html;
}

function generatePosts() {
    for (var i = 0; i < posts.length; i++) {
        document.write(generatePost(posts[i]));
        if (i < posts.length - 1) {
            document.write('<hr/>');
        }
    }
}

function generatePagination(total, current) {
    document.write('<ul class="pagination">');
    document.write('<li><a href="#">&laquo;</a></li>');
    for (var i = 1; i <= total; i++) {
        if (i == current) {
            document.write('<li class="active"><a href="#">' + i + '</a></li>');
        } else {
            document.write('<li><a href="#">' + i + '</a></li>');
        }
    }
    document.write('<li><a href="#">&raquo;</a></li>');
    document.write('</ul>');
}