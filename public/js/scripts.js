// Smooth scrolling using jump.js as described in https://www.sitepoint.com/smooth-scrolling-vanilla-javascript/

initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    document.getElementById('css-support-msg').className = 'supported';
    return;
  }

  var duration = 400;

  var pageUrl = location.hash ?
    stripHash(location.href) :
    location.href;

  //delegatedLinkHijacking();
  directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) {
        a.addEventListener('click', onClick, false);
      });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      //console.log(e.target.hash)
      jump(e.target.hash, {
        duration: duration,
        offset: -350
      });
      // var link = e.target.hash.substr(1);
      // console.log(link);
      // var target = document.getElementById(link);
      // var headings = document.getElementsByTagName('h2');
      // var hlength = headings.length;
      // for(i = 0; i < hlength; i++){
      // headings[i].classList.remove('offset');
      // }
      // target.classList.add('offset');
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop)
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

}


// Sticky Nav Component
// modified from https://gist.githubusercontent.com/javierarques/36d3cd821c5a36acd352c11f88bbf2f4/raw/d11d2196a86b4b9108b9b03182145fac13521491/sticky.js
// added action throttler - kd

var Sticky = (function() {
  'use strict';

  var CSS_CLASS_ACTIVE = 'is-fixed';
  var actionTimeout;
  // var last_known_scroll_position = 0;
  // var ticking = false;

  var Sticky = {
    element: null,
    position: 0,
    addEvents: function() {
      window.addEventListener('scroll', this.actionThrottler.bind(this));
    },
    init: function(element) {
      this.element = element;
      this.addEvents();
      this.position = element.offsetTop ;
      this.actionThrottler();
    },
    actionThrottler: function() {
    var that = this;      
    // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !actionTimeout ) {
          actionTimeout = setTimeout(function() {
              actionTimeout = null;               
              that.actualActionHandler();
          // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
      }
    },
    actualActionHandler: function(){
      var that = this;
      function stickyNav(){
        that.onScroll();
      }
      stickyNav()
    },
    aboveScroll: function() {
      return this.position < window.scrollY;
    },
    onScroll: function(event) {
      //console.log("checked");
      if (this.aboveScroll()) {
        this.setFixed();
      } else {
        this.setStatic();
      }
    },
    setFixed: function() {
      this.element.classList.add(CSS_CLASS_ACTIVE);
    },
    setStatic: function() {
      this.element.classList.remove(CSS_CLASS_ACTIVE);
    }
  };

  return Sticky;

})();


//  Init Sticky
var sticky = document.querySelector('.sticky');
if (sticky)
  Sticky.init(sticky);


// offset anchors
// that's all above much more concise!!!
// (function(){
//    var anchors = document.getElementsByTagName('a');
//    var len = anchors.length;
//    // console.log("Number anchors ", len);
//    for(i = 0; i < len; i++){
//      var j = i;
//      (function(n){
//      if (anchors[n].href.indexOf('#') > -1){
//        var index = anchors[n].href.indexOf('#')
//        var link = anchors[n].href.substr(index+1)
//        // console.log("Link ",link);
//        // anchors[i].style.background = 'red';
//          anchors[n].addEventListener('click', function(){
//            var target = document.getElementById(link);
//            var headings = document.getElementsByTagName('h2');
//            var hlength = headings.length;
//            for(i = 0; i < hlength; i++){
//             headings[i].classList.remove('offset');
//            }
//            target.classList.add('offset');
//          })
//        }})(j)
//      }
// })()
   



