import { home } from './src/components/home.js'
import { about } from './src/components/about.js'
import { allGames } from './src/components/allGames.js'
import { trending } from './src/components/trending.js'
import { surpriseMe } from './src/components/surpriseMe.js'
import { getData } from './src/components/fetchData.js'
import { initSearch } from './src/components/initSearch.js'

const app = document.querySelector(".app")

// Create Error Page
function notFound() {
    const container = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = "this page is not found"
    container.appendChild(p)
    return container
}

const route = {
    '/': home,
    '/about': about,
    '/games': allGames,
    '/trending': trending,
    '/surpriseMe': surpriseMe
}

// get All Pages
async function createRoute() {
    const hash = window.location.hash || '#/'
    const path = window.location.hash.slice(1) || '/'
    const url = route[path] || notFound


    const loadingSpan = document.createElement('span')
    loadingSpan.textContent = 'Loading...'
    loadingSpan.className = "text-white/70 text-sm mt-4 font-orbitron tracking-wider flex"

    app.classList.add('opacity-0')
    app.innerHTML = ''
    app.appendChild(loadingSpan)
    app.classList.remove('opacity-0')

    try {
        const viewElement = await url()

        app.classList.add('opacity-0')
        await new Promise((res) => setTimeout(res, 100))

        app.innerHTML = ''
        app.appendChild(viewElement)
        window.scrollTo({ top: 0, behavior: 'instant' })
        app.classList.remove('opacity-0')
    } catch (error) {
        console.error("Error loading route:", error)
        app.innerHTML = '<p class="text-center text-white py-10">Failed to load content. Please try again.</p>'
        app.classList.remove('opacity-0')
    }
    updateActiveNav(hash)
}

// Change Pages
function initRoute() {
    window.addEventListener('hashchange', createRoute)
    window.addEventListener('load', createRoute)
}

// Navbar selected
function updateActiveNav(currentHash) {
    const links = document.querySelectorAll('.nav-link')
    links.forEach(li => {
        const href = li.getAttribute('href')
        li.classList.remove('nav-active')
        if (href === currentHash) {
            li.classList.add('nav-active')
        }
    })
}

// Set toggle Icone
const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

function setMenu(open) {
    menu.classList.toggle('hidden', !open)
    menu.classList.toggle('flex', open)
    btn.setAttribute('aria-expanded', open)
    btn.querySelector('i').className = open ? 'ti ti-x' : 'ti ti-menu-2'
}
btn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')))
menu.addEventListener('click', e => e.target.closest('a') && setMenu(false))

// Set Up Button 
function upButton() {
    const up = document.createElement('div')
    up.textContent = 'Top'
    up.className = 'up-btn'
    document.body.appendChild(up)
    if (!up) return
    window.onscroll = () => {
        window.scrollY >= 1000 ? up.classList.add('show') : up.classList.remove('show')
    }

    up.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}

// Fainaly
upButton()
initSearch()
initRoute()