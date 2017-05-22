var express = require('express')
var router = express.Router()
var techList = require('./model/tech')
var meetupList = require('./model/meetup')
var sponsorList = require('./model/sponsor')
var nav = require('./model/nav')
var doc = require('./utils/doc')
var docsidenav = require('./utils/docsidenav')
var subpages = require('./utils/subpages')
var quotesInspiration = require('./model/quotesInspiration')
var quotesCrockford = require('./model/quotesCrockford')
var quotesJokes = require('./model/quotesJokes')

// console.log(meetupList, techList)

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Welcome to JavaScript 101',
    message: 'We are a JavaScript meetup group in Bristol, UK.',
    active: '/',
    techList: techList,
    meetupList: meetupList,
    sponsorList: sponsorList,
    quotesInspiration: quotesInspiration,
    quotesCrockford: quotesCrockford,
    quotesJokes: quotesJokes
  })
})

function removeMd(link){
  return (link.substr(-3)) == '.md' ? link.slice(0,-3) : link;
}

for (var key in nav){
  var pages = nav[key];
  var subpages = Object.keys(pages).map(function(key){
    return [key, removeMd(pages[key])]
  })
  var sectionTitle = key.replace('/','').replace(/-/g,' ').replace(/\b\w/g, function(l){ return l.toUpperCase()})
  console.log(subpages)
  for (var pagekey in pages) {
    var pathpart = pages[pagekey];
    var navLink = removeMd(pathpart); 
    var pagetitle = sectionTitle+' - '+pagekey;
    var itemVars = {
      active: key,
      pagetitle: sectionTitle,
      title: pagekey,
      subnav: subpages
    };
    (function(link, path, vars){
    router.get(link, function(req, res){
      docsidenav.render(path, res, vars);
      })       
    })(navLink, pathpart, itemVars)
  }
}

router.get('/projects', function(req, res){
  res.render('projects', {active: '/projects'})
})

router.get('/resources', function(req, res){
  res.render('resources', {active: '/resources'})
})



module.exports = router
