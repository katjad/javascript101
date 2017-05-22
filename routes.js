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
  var sectionTitle = key.replace('/','').replace(/\b\w/g, function(l){ return l.toUpperCase()})
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

// var navItems = {
//   '/getting-started': 'getting-started.md',
//   '/getting-started/git': 'git.md',
//   '/about': 'about.md',
//   '/best-practices': 'reference/best-practices.md',
//   '/careers': 'careers.md',
//   '/presentations': 'what-we-do/presentations.md',
//   '/getting-started/roadmap': 'roadmap.md',
//   '/pair-programming': 'what-we-do/pair-programming.md',
//   '/code-reviews': 'what-we-do/code-reviews.md',
//   '/team-environment': 'team-environment.md',
//   '/feedback': 'feedback.md',
//   '/tech-stack': 'tech-stack.md'
// }

// for (var key in navItems){
//   var navLink = key;
//   (function(link){
//     router.get(link, function(req, res){
//       doc.render(navItems[link], res, {active: link})
//     })
//   })(navLink)
// }

// router.get('/reference', function(req, res){
//   subpages.render('docs/reference', res, {active: '/reference', header1: 'Reference'})
// })

router.get('/what-we-do', function(req, res){
  subpages.render('docs/what-we-do', res, {active: '/what-we-do', header1: 'What we do'})
})

router.get('/getting-started/roadmap-visual', function(req, res){
  res.render('roadmap-visual', {active: '/getting-started/roadmap-visual'})
})

router.get('/projects', function(req, res){
  res.render('projects', {active: '/projects'})
})

router.get('/resources', function(req, res){
  res.render('resources', {active: '/resources'})
})



module.exports = router
