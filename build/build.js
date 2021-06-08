var h = require('./helpers')

var md = require('markdown-it')({
  html: true, // enable html tags in markdown
})
md.use(require('@iktakahiro/markdown-it-katex'))
md.use(require('markdown-it-footnote'))
md.use(require('markdown-it-prism'))

// Build posts, posts (will be) written in markdown files

var posts = h.readMany('content/posts/')

posts.forEach(vars => {
  vars.pagedescription = vars.title + ' | ' + vars.subtitle
  if (vars.fname.slice(-3) == '.md') {
    vars.body = md.render(vars.body)
    vars.fname = vars.fname.slice(0, -3)
  }
  var html = h.page('post', vars) // render template
  h.write('p/' + vars.fname + '.html', html)
})

// Build journal
var journals = h.readMany('content/journal/')

var html = h.page('journal-list', {
  journals: journals.map(vars => {
    return {
      body: md.render(vars.body),
      date: vars.date, // or fname, same thing
    }
  })
})
h.write('j.html', html)

// Build the homepage, this requires posts for generating links.

var html = h.page('index', {
  body: md.render(h.read('content/index.md')),
  posts: posts.filter(p => !p.draft),
  pagedescription: "Ulisse Mini's personal website",
})
h.write('index.html', html)

var html = h.page('index', {
  body: md.render(h.read('content/index.md')),
  posts: posts.filter(p => p.draft),
  pagedescription: "Ulisse Mini's personal website",
})
h.write('drafts.html', html)

// Copy static files over (fuck you windows :D)
const {execSync} = require("child_process");
execSync("cp -rf ./static/* ./site", {stdio: 'inherit'})
