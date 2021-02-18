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
      if (code[0] == '$') {
        return katex.renderToString(code.slice(1), {throwOnError: false})
      }

      return false
    }
  }
})

module.exports = marked
