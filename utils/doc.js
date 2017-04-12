var path = require('path')
var fs = require('fs')
var objAssign = require('object-assign')
var marked = require('marked')
var REPO_URL = 'https://github.com/CodeHubOrg/javascript101/blob/master/docs/'

var render = function(filename, res, vars) {
  var file = path.join(__dirname, '../docs' ,filename)
  fs.readFile(file, 'utf8', function(err, contents) {
    var contents_obj = {
      content: marked(contents),
      editUrl: REPO_URL+filename
    }
    var page_content = objAssign(
      contents_obj, vars
    )
    err ? console.error :
    res.render('doc', page_content)
  })
}

module.exports = {
  render: render
}
