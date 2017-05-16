

var last_known_scroll_position = 0;
var ticking = false;

function addSticky(){
  document.getElementById("sub").classList.add("fixed")
}
function removeSticky(){
  document.getElementById("sub").classList.remove("fixed")
}

function fixNav(scroll_pos) {
  // console.log(scroll_pos)
  scroll_pos > 280 ? addSticky() : removeSticky()
  // console.log(document.getElementById("sub").classList)
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      fixNav(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});

