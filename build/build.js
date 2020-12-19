var Mustache = require('mustache')
var YAML = require('yaml')
var fs = require('fs')
var path = require('path')

function read(filename) {
  return fs.readFileSync(filename, {encoding: 'utf8'})
}

// contents of filename after the meta header
function body(filename) {
  return read(filename).split('\n\n').slice(1).join('\n\n').trim()
}

// object of YAML-formatted metadata at the top of a file
function meta(filename) {
  var contents = read(filename)
  return YAML.parse(contents.split('\n\n')[0])
}

function page(template, vars) {
  if (!template) throw Error('template not provided')
  vars['pagetitle'] = vars['title'] || 'Ulisse Mini'

  html = Mustache.render(read('templates/header.mustache'), vars)

  html += Mustache.render(read(template), vars)

  html += Mustache.render(read('templates/footer.mustache'), vars)
  return html
}

function write(relpath, data) {
  var fullpath = 'site/' + relpath
  var dirname = path.dirname(fullpath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, {recursive: true,})
  }

  fs.writeFileSync(fullpath, data)
  console.log('wrote', fullpath)
}

// Was having trouble with module system
var h = {write: write, page: page, meta: meta, read: read, body: body}
module.exports = h

// ----------------------- build('posts') ------------------------------

var pdir = 'content/posts/'

var posts = fs.readdirSync(pdir)

posts.forEach(post => {
  var vars = h.meta(pdir + post)
  vars.body = h.body(pdir + post)

  var html = h.page('templates/post.mustache', vars)

  h.write('posts/' + post + '.html', html)
})


