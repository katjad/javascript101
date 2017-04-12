var path = require('path')
var fs = require('fs')
var objAssign = require('object-assign')
var marked = require('marked')
var REPO_URL = 'https://github.com/CodeHubOrg/javascript101/blob/master/docs/'

var render = function(filename, res, vars) {
  var file = path.join(__dirname, '../docs' ,filename)
  fs.readFile(file, 'utf8', function(err, contents) {
    var contentsObj = {
      content: marked(contents),
      editUrl: REPO_URL+filename
    }
    var pageContent = objAssign(
      contentsObj, vars
    )
    err ? console.error :
    res.render('doc', pageContent)
  })
}

module.exports = {
  render: render
}
