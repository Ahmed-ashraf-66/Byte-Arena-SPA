import { getData } from './fetchData.js'
import { createSavedButton } from './savedStorage.js'

const STEPS = 30
const TARGET = 25
const SPIN_TIME = 3000

async function createSurpriseMe() {
    const games = await getData()
    if (!games) return document.createElement('section')

    const section = document.createElement('section')
    section.className = 'surprise-section'

    const title = document.createElement('h2')
    title.className = 'surprise-title'
    title.textContent = 'Pick a random game for me'

    const viewport = document.createElement('div')
    viewport.className = 'surprise-viewport'

    const track = document.createElement('div')
    track.className = 'surprise-track'

    const frame = document.createElement('div')
    frame.className = 'surprise-frame'

    viewport.append(track, frame)

    const spinBtn = document.createElement('button')
    spinBtn.className = 'surprise-btn'
    spinBtn.textContent = 'Surprise me with a game!'

    const resultBox = document.createElement('div')
    resultBox.className = 'surprise-result'

    section.append(title, viewport, spinBtn, resultBox)

    function randomGame() {
        return games[Math.floor(Math.random() * games.length)]
    }

    function createItem(game) {
        const item = document.createElement('div')
        item.className = 'surprise-item'

        const img = document.createElement('img')
        img.className = 'surprise-item-img'
        img.src = game.thumbnail
        img.alt = game.title

        const info = document.createElement('div')
        info.className = 'surprise-item-info'

        const name = document.createElement('span')
        name.className = 'surprise-item-title'
        name.textContent = game.title

        const genre = document.createElement('span')
        genre.className = 'surprise-item-genre'
        genre.textContent = game.genre

        info.append(name, genre)
        item.append(img, info)
        return item
    }

    // firstGame is what the viewport shows before the spin, winner lands at TARGET
    function populateTrack(firstGame, winner) {
        track.innerHTML = ''
        for (let i = 0; i < STEPS; i++) {
            let game = randomGame()
            if (i === 0) game = firstGame
            if (i === TARGET && winner) game = winner
            track.appendChild(createItem(game))
        }
    }

    function showResult(game) {
        resultBox.innerHTML = ''

        const info = document.createElement('div')
        info.className = 'surprise-result-info'

        const img = document.createElement('img')
        img.className = 'surprise-result-img'
        img.src = game.thumbnail
        img.alt = game.title

        const text = document.createElement('div')

        const name = document.createElement('h4')
        name.className = 'surprise-result-title'
        name.textContent = game.title

        const congrats = document.createElement('p')
        congrats.className = 'surprise-result-text'
        congrats.textContent = 'Congrats! This is your random game for today'

        text.append(name, congrats)
        info.append(img, text)

        const viewBtn = document.createElement('a')
        viewBtn.className = 'surprise-result-btn'
        viewBtn.href = `game.html?id=${game.id}`
        viewBtn.target = '_blank'
        viewBtn.rel = 'noopener'
        viewBtn.textContent = 'View Game'

        resultBox.append(info, viewBtn)
        resultBox.classList.add('show')
    }

    let shown = randomGame()
    let isSpinning = false

    populateTrack(shown)

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return
        isSpinning = true
        spinBtn.disabled = true
        resultBox.classList.remove('show')

        const winner = randomGame()

        // reset to the start without animation, the first item is the game already on screen
        track.style.transition = 'none'
        track.style.transform = 'translateY(0)'
        populateTrack(shown, winner)
        void track.offsetHeight

        const itemHeight = track.firstElementChild.offsetHeight
        track.style.transition = `transform ${SPIN_TIME}ms cubic-bezier(0.1, 0.9, 0.2, 1)`
        track.style.transform = `translateY(${-TARGET * itemHeight}px)`

        setTimeout(() => {
            shown = winner
            showResult(winner)
            spinBtn.textContent = 'Try another game!'
            spinBtn.disabled = false
            isSpinning = false
        }, SPIN_TIME)
    })

    return section
}

function getSaved() {
    return JSON.parse(localStorage.getItem('saveGames')) || []
}

function createSavedGames() {
    const section = document.createElement('section')
    section.className = 'saved-section'

    const heading = document.createElement('h2')
    heading.className = 'saved-title'
    const count = document.createElement('span')
    count.className = 'saved-count'
    heading.append('Saved Games ', count)

    const row = document.createElement('div')
    row.className = 'saved-row'

    const empty = document.createElement('p')
    empty.className = 'saved-empty'
    empty.textContent = 'No saved games yet. Tap the bookmark on any game to keep it here.'

    section.append(heading, row, empty)

    function updateState() {
        const total = getSaved().length
        count.textContent = `(${total})`
        empty.hidden = total > 0
    }

    getSaved().forEach(game => {
        const card = document.createElement('a')
        card.className = 'saved-card'
        card.href = `game.html?id=${game.id}`
        card.target = '_blank'
        card.rel = 'noopener'

        const img = document.createElement('img')
        img.className = 'saved-card-img'
        img.src = game.thumbnail
        img.alt = game.title
        img.loading = 'lazy'

        const tag = document.createElement('span')
        tag.className = 'saved-card-tag'
        tag.textContent = game.genre

        const removeBtn = createSavedButton('saved-card-remove')
        removeBtn.setGame(game)
        removeBtn.button.addEventListener('click', () => {
            card.classList.add('removing')
            setTimeout(() => {
                card.remove()
                updateState()
            }, 300)
        })

        const name = document.createElement('h3')
        name.className = 'saved-card-title'
        name.textContent = game.title

        const publisher = document.createElement('p')
        publisher.className = 'saved-card-publisher'
        publisher.textContent = game.publisher

        card.append(img, tag, removeBtn.button, name, publisher)
        row.appendChild(card)
    })

    updateState()
    return section
}

export async function surpriseMe() {
    const container = document.createElement('div')
    const surprise = await createSurpriseMe()
    const savedGames = createSavedGames()
    container.append(surprise, savedGames)
    return container
}

export default surpriseMe