// Enable burger nav dropdown at small viewport sizes.

const burger = document.querySelector('.navbar-toggle')
const nav = document.querySelector('#navbar')

const toggleMenu = () => {
  nav.classList.toggle("collapse")
}

burger.addEventListener('click', toggleMenu)
