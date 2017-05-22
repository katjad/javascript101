var path = require('path')
var fs = require('fs')
var marked = require('marked')
var REPO_URL = 'https://github.com/CodeHubOrg/javascript101/blob/master/docs/'

var render = function(dirPath, res, vars){
  var dir =  path.join(__dirname,'..', dirPath)
  contentsArr = []
  fs.readdir(dir, function(err, list){
     if(err){
      console.error("list could not be read:", err)
     } else {
        var len = list.length
        list.forEach(function(filename){
          var file = path.join(dir, filename)
          fs.readFile(file, 'utf8', function(err, contents){
            filename = filename.replace('.md','')
            heading = filename.replace('-',' ').replace(/\b\w/g, function(l){ return l.toUpperCase() }) //use all one regular expr!
            var contentsObj = {
              content: marked(contents),
              heading: heading,
              filename: filename
            }
            err ? console.error : 
            contentsArr.push(contentsObj)
            if(contentsArr.length == len){
              res.render('subpages', 
                {
                  listNum: len, 
                  contentBlocks: contentsArr, 
                  content: vars.header1,
                  active: vars.active
                })
            }
          })
        })
       
     }
  })
}

module.exports = {
  render: render
}
