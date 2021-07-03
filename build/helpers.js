const Mustache = require('mustache')
const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

const h = {}

h.read = function (filename) {
  return fs.readFileSync(filename, {encoding: 'utf8'})
}

// contents of filename after the meta header
h.body = function (filename) {
  return h.read(filename).split('\n\n').slice(1).join('\n\n').trim()
}

// object of YAML-formatted metadata at the top of a file
h.meta = function (filename) {
  const contents = h.read(filename)
  return YAML.parse(contents.split('\n\n')[0])
}

h.write = function (relpath, data) {
  const fullpath = path.join('site/', relpath)
  const dirname = path.dirname(fullpath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, {recursive: true})
  }

  fs.writeFileSync(fullpath, data)
  console.log('wrote', fullpath)
}

h.page = function (template, vars) {
  if (!template) throw Error('template not provided')
  template = path.join('templates', template + '.mustache')
  vars['pagetitle'] = vars['title'] || 'Ulisse Mini'

  html = Mustache.render(h.read('templates/header.mustache'), vars)

  html += Mustache.render(h.read(template), vars)

  html += Mustache.render(h.read('templates/footer.mustache'), vars)

  return html
}

function parseDate(date) {
  const d = Date.parse(date)
  if (isNaN(d)) {throw new Error(`invalid date '${date}'`)}
  return d // return: epoch (int)
}

function sortByDate(data) {
  data.sort((a, b) => parseDate(b.date) - parseDate(a.date))
  return data
}

function prettyDate(epoch) {
  const d = new Date(epoch)
  const shortMonthName = new Intl.DateTimeFormat("en-US", {month: "short"}).format;
  return `${d.getFullYear()} ${shortMonthName(d)} ${d.getDay()}`
}

h.readMany = function (dir) {
  const fnames = fs.readdirSync(dir)
  const data = fnames.map(fname => {
    let view = {
      fname: fname,
      body: h.body(path.join(dir, fname)),
      humandate: () => prettyDate(parseDate(view.date)),
      ...h.meta(path.join(dir, fname)),
    }

    return view
  })
  sortByDate(data)

  return data
}

module.exports = h
