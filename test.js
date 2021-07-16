const assert = require('assert')
const cheerio = require('cheerio')
const fs = require('fs')

function read(path) {
  return fs.readFileSync('site/' + path, {encoding: 'utf8'})
}

// TODO: Run build script if needed
describe('site', () => {
  describe('homepage', () => {
    const html = read('index.html')
    const $ = cheerio.load(html)
    it('has a title', () => assert($('title').text().length >= 3))
    it('has a list of cats', () => assert($('.cats').children().length > 0))
    it('has an h1 tag with text', () => assert($('h1').text().length > 0))
    it('has links to posts', () => assert($('a[href^="/p/"]').length > 0))
  })
})
