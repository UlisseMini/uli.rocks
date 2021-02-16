var h = require('./helpers')

// Build posts, posts (will be) written in markdown files

var posts = h.readMany('content/posts/')

posts.forEach(vars => {
  vars.pagedescription = vars.title + ' | ' + vars.subtitle
  var html = h.page('templates/post.mustache', vars)
  h.write('posts/' + vars.fname + '.html', html)
})


// Build projects, projects are written in mustache files

// This is duplication, but I might need to change something specifc here, so I'd
// rather keep them separate.
var projects = h.readMany('content/projects/')
projects.forEach(vars => {
  vars.pagedescription = vars.title + ' | ' + vars.subtitle
  var html = h.page('templates/project.mustache', vars)
  h.write('p/' + vars.fname + '.html', html)
})


// Build the homepage, this requires posts and projects so it can generate links.

console.log(posts)
var html = h.page('templates/home.mustache', {
  posts: posts,
  projects: projects,
  pagedescription: "Ulisse Mini's personal website",
})
h.write('index.html', html)

