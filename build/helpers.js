var Mustache = require('mustache')
var fs = require('fs')
var path = require('path')
var YAML = require('yaml')

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
    fs.mkdirSync(dirname, {recursive: true, })
  }

  fs.writeFileSync(fullpath, data)
  console.log('wrote', fullpath)
}

function readMany(dir) {
  var fnames = fs.readdirSync(dir)
  var data = fnames.map(fname => {
    return {
      fname: fname,
      body: h.body(dir + fname),
      ...h.meta(dir + fname) // TODO: filepath join
    }
  })
  data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  return data
}

// Was having trouble with module system
var h = {write: write, page: page, meta: meta, read: read, body: body, readMany: readMany}
module.exports = h
