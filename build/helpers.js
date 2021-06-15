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
  template = path.join('templates', template + '.mustache')
  vars['pagetitle'] = vars['title'] || 'Ulisse Mini'

  html = Mustache.render(read('templates/header.mustache'), vars)

  html += Mustache.render(read(template), vars)

  html += Mustache.render(read('templates/footer.mustache'), vars)
  return html
}

function write(relpath, data) {
  var fullpath = path.join('site/', relpath)
  var dirname = path.dirname(fullpath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, {recursive: true})
  }

  fs.writeFileSync(fullpath, data)
  console.log('wrote', fullpath)
}

function parseDate(date) {
  var d = Date.parse(date)
  if (isNaN(d)) {throw new Error(`invalid date '${date}'`)}
  return d
}

function sortByDate(data) {
  data.sort((a, b) => parseDate(b.date) - parseDate(a.date))
  return data
}

function readMany(dir) {
  var fnames = fs.readdirSync(dir)
  var data = fnames.map(fname => {
    return {
      fname: fname,
      body: h.body(path.join(dir, fname)),
      ...h.meta(path.join(dir, fname))
    }
  })
  sortByDate(data)

  return data
}

// Was having trouble with module system
var h = {write: write, page: page, meta: meta, read: read, body: body, readMany: readMany}
module.exports = h
