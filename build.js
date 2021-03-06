const h = require('./helpers')

const md = require('markdown-it')({html: true})
md.use(require('@iktakahiro/markdown-it-katex'))
md.use(require('markdown-it-footnote'))
md.use(require('markdown-it-prism'))

function buildPosts() {
  const posts = h.readMany('content/posts/')

  posts.forEach(vars => {
    vars.pagedescription = vars.title + ' | ' + vars.subtitle
    if (vars.fname.slice(-3) == '.md') {
      vars.body = md.render(vars.body)
      vars.fname = vars.fname.slice(0, -3) + '.html'
    }
    let html = h.page('post', vars) // render template
    h.write('p/' + vars.fname, html)
  })
  return posts
}

function buildCats(posts) {
  const unique = (x) => Array.from(new Set(x))
  const catPath = (cat) => `${cat}.html`

  let cats = new Set(posts.flatMap(p => unique(p.cats)))
  cats.add('index') // default cat (also default in readMany)
  cats = Array.from(cats).sort()

  const catsView = cats.map(cat => {
    return {
      'cat': cat,
      'href': catPath(cat),
      'humancat': () => h.titleCase(cat),
    }
  })

  cats.forEach(cat => {
    html = h.page('index', {
      body: md.render(h.read('content/index.md')),
      posts: posts.filter(p => p.cats.includes(cat)),
      pagedescription: "Ulisse Mini's personal website",
      cats: catsView,
    })
    h.write(catPath(cat), html)
  })
}

const posts = buildPosts()
buildCats(posts)

// Copy static files over (fuck you windows :D)
const {execSync} = require("child_process");
execSync("cp -rf ./static/* ./site", {stdio: 'inherit'})
