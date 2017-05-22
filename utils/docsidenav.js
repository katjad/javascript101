var path = require('path')
var fs = require('fs')
var objAssign = require('object-assign')
var marked = require('marked')
var REPO_URL = 'https://github.com/CodeHubOrg/javascript101/blob/master/docs/'

var render = function(filename, res, vars) {
  var file = path.join(__dirname, '../docs' ,filename)
  fs.readFile(file, 'utf8', function(err, contents) {
    var content = marked(contents);
    var reg = /h2 id="(.*)"/g;    
    var matches, output = [];
    while (matches = reg.exec(content)) {
        output.push(matches[1]);
    }
    var contentsObj = {
      content: content,
      editUrl: REPO_URL+filename,
      inPageNav: output
    }
    var pageContent = objAssign(
      contentsObj, vars
    )
    if(filename == '/roadmap.md'){
      err ? console.error :
      res.render('roadmap', pageContent)
    } else {
      err ? console.error :
      res.render('docsidenav', pageContent)
    }
  })
}

module.exports = {
  render: render
}
