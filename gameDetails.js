import { getGame } from "./src/components/fetchData.js";
import { createSavedButton } from "./src/components/savedStorage.js";
import { getData } from "./src/components/fetchData.js";

const app = document.getElementById('game-page')
const id = Number(new URLSearchParams(window.location.search).get('id'))
const game = await getGame(id)

export async function openGameDetails() {


    if (!game) {
        app.textContent = 'Game Not Found'
    } else {
        document.title = game.title
        gameDetails(game)
    }
}

function gameDetails(game) {
    const section = document.createElement('section')
    section.className = 'game-details-section'

    const titleSection = document.createElement('h1')
    titleSection.className = 'game-detalis-title'
    titleSection.textContent = 'Game Detalis'

    const detailsBox_1 = document.createElement('div')
    detailsBox_1.className = 'game-details-box'

    const gameName = document.createElement('h2')
    gameName.className = 'game-details-name'
    gameName.textContent = game.title

    const gameImage = document.createElement('img')
    gameImage.className = 'game-details-image'
    gameImage.src = game.thumbnail
    gameImage.loading = 'lazy'

    const description = document.createElement('h3')
    description.className = 'game-details-desciption'
    description.textContent = game.short_description

    const descriptionBox = document.createElement('div')
    descriptionBox.className = 'details-description-box'

    const buttonsBox = document.createElement('div')
    buttonsBox.className = 'details-buttons-box'

    const palyBtn = document.createElement('a')
    palyBtn.href = game.game_url
    palyBtn.className = 'buttons-box-play'
    palyBtn.textContent = 'Play Now'

    const saveDiv = document.createElement('div')
    saveDiv.className = 'buttons-box-save'
    const saveBtn = createSavedButton('buttons-box-save-a')
    saveDiv.appendChild(saveBtn.button)
    saveBtn.setGame(game)

    const platformSpan = document.createElement('span')
    platformSpan.className = 'buttons-box-platform'
    const platformIcon = document.createElement('i')
    platformIcon.className = game.platform === "Windows" ? "ti ti-brand-windows" : "ti ti-brand-webflow"
    platformSpan.appendChild(platformIcon)

    const genreSpan = document.createElement('span')
    genreSpan.className = 'buttons-box-genre'
    genreSpan.textContent = game.genre

    const detailsBox_2 = document.createElement('div')
    detailsBox_2.className = 'game-details-box-2'

    const gameAbout = document.createElement('div')
    gameAbout.className = 'game-details-about'

    const about = document.createElement('h2')
    about.textContent = 'About'

    const fullDescription = document.createElement('h4')
    fullDescription.className = 'details-full-description'
    fullDescription.textContent = game.description

    const screen = document.createElement('h2')
    screen.textContent = 'Screenshots'

    const screenBox = document.createElement('div')
    screenBox.className = 'game-details-screenshots'

    game.screenshots.map(g => {
        const imgScreen = document.createElement('img')
        imgScreen.src = g.image
        screenBox.appendChild(imgScreen)
    })

    const gameInfo = document.createElement('div')
    gameInfo.className = 'game-details-info'

    const Info = document.createElement('h3')
    Info.textContent = 'Game Information'

    const publisher = document.createElement('div')
    const publisherSpan = document.createElement('span')
    publisher.textContent = 'Publisher '
    publisherSpan.textContent = game.publisher
    publisher.appendChild(publisherSpan)
    const developer = document.createElement('div')
    const developerSpan = document.createElement('span')
    developer.textContent = 'Developer '
    developerSpan.textContent = game.developer
    developer.appendChild(developerSpan)
    const releaseDate = document.createElement('div')
    const releaseDateSpan = document.createElement('span')
    releaseDate.textContent = 'Release Date '
    releaseDateSpan.textContent = game.release_date
    releaseDate.appendChild(releaseDateSpan)

    const requirements = document.createElement('h3')
    requirements.textContent = 'Requirements'

    const requirementsBox = document.createElement('div')

    const os = document.createElement('div')
    os.className = 'game-requirements'
    os.textContent = 'OS '
    const osSpan = document.createElement('span')
    osSpan.textContent = game.minimum_system_requirements.os
    os.appendChild(osSpan)

    const processor = document.createElement('div')
    processor.className = 'game-requirements'
    processor.textContent = 'processor '
    const processorSpan = document.createElement('span')
    processorSpan.textContent = game.minimum_system_requirements.processor
    processor.appendChild(processorSpan)

    const memory = document.createElement('div')
    memory.textContent = 'Memory '
    memory.className = 'game-requirements'
    const memorySpan = document.createElement('span')
    memorySpan.textContent = game.minimum_system_requirements.memory
    memory.appendChild(memorySpan)

    const graphics = document.createElement('div')
    graphics.textContent = 'Graphics '
    graphics.className = 'game-requirements'
    const graphicsSpan = document.createElement('span')
    graphicsSpan.textContent = game.minimum_system_requirements.graphics
    graphics.appendChild(graphicsSpan)

    const storage = document.createElement('div')
    storage.textContent = 'Storage '
    storage.className = 'game-requirements'
    const storageSpan = document.createElement('span')
    storageSpan.textContent = game.minimum_system_requirements.storage
    storage.appendChild(storageSpan)

    requirementsBox.append(os, processor, memory, graphics, storage)
    gameInfo.append(Info, publisher, developer, releaseDate, requirements, requirementsBox)
    gameAbout.append(about, fullDescription, screen, screenBox)
    detailsBox_2.append(gameAbout, gameInfo)
    buttonsBox.append(palyBtn, saveDiv, platformSpan, genreSpan)
    descriptionBox.append(gameName, description, buttonsBox)
    detailsBox_1.append(gameImage, descriptionBox)
    section.append(titleSection, detailsBox_1, detailsBox_2)
    app.appendChild(section)
}

async function createSimilarGames(game) {
    const games = await getData()
    const similar = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 6)

    if (similar.length === 0) return null

    const section = document.createElement('section')
    section.className = 'details-similar-section'

    const title = document.createElement('h2')
    title.textContent = 'More Like this'

    const cardsBox = document.createElement('div')
    cardsBox.className = 'similar-cards-box'

    similar.forEach(g => {
        const card = document.createElement('a')
        card.className = 'details-similar-card'
        card.href = `game.html?id=${g.id}`
        card.target = '_blank'
        card.rel = 'noopener'

        const img = document.createElement('img')
        img.src = g.thumbnail
        img.loading = 'lazy'

        const name = document.createElement('h4')
        name.textContent = g.title

        const genre = document.createElement('div')
        genre.textContent = g.genre

        card.append(img, name, genre)
        cardsBox.appendChild(card)
    });
    section.append(title, cardsBox)
    return section
}

openGameDetails()
const similarSetion = await createSimilarGames(game)
if (similarSetion) app.appendChild(similarSetion)