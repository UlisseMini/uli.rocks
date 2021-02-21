var marked = require('marked')
var prism = require('prismjs')
var loadLanguages = require('prismjs/components/');
var katex = require('katex')

loadLanguages(['javascript', 'jsx', 'css', 'markup', 'bash', 'json', 'python', 'c', 'rust'])

marked.setOptions({
  highlight: function (code, lang) {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang)
    } else {
      return code
    }
  }
})

marked.use({
  renderer: {
    codespan: (code) => {
      // TODO: Fix escaped characters (eg ') being sanitized, then causing latex errors,
      // Maybe unescape? or yell at marked to add another argument to codespan?
      if (code[0] == '$') {
        return katex.renderToString(code.slice(1), {displayMode: false})
      }

      return false
    },

    code: (code, infostring, _escapeed) => {
      console.log('info', infostring)
      if (infostring == 'tex') {
        return katex.renderToString(code, {displayMode: true})
      }

      return false
    }
  },

})

module.exports = marked
