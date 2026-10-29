import { getData } from "./fetchData.js"

// Create Search Engine
export async function initSearch() {
    const searchDiv = document.querySelector('.search')
    const searchItem = document.querySelector('.search input')
    const games = await getData()

    function search() {
        const searchValue = searchItem.value.toLowerCase().trim()

        if (!searchValue) return []

        return games.filter(g => g.title.toLowerCase().includes(searchValue)).slice(0, 5)
    }

    const suggesBox = document.createElement('div')
    suggesBox.className = 'suggestions-search-box hidden'
    searchDiv.appendChild(suggesBox)

    function renderSuggestions() {
        const result = search()

        suggesBox.innerHTML = ''
        suggesBox.classList.toggle('hidden', searchItem.value.trim() === '')

        if (searchItem.value.trim() !== '' && result.length === 0) {
            const msg = document.createElement('p')
            msg.className = 'suggestion-no-result'
            msg.textContent = 'No Result'
            suggesBox.appendChild(msg)
            return
        }

        result.forEach(game => {

            const card = document.createElement('a')
            card.className = 'suggestion-game-card'
            card.href = `game.html?id=${game.id}`
            card.target = '_blank'
            card.rel = 'noopener'
            const img = document.createElement('img')
            img.src = game.thumbnail
            img.className = 'suggestion-game-image'
            const gameName = document.createElement('h2')
            gameName.textContent = game.title
            gameName.className = 'suggestion-game-title'
            card.append(img, gameName)
            suggesBox.appendChild(card)
        })
    }

    searchItem.addEventListener('input', renderSuggestions)
}