import { getData } from './fetchData.js'
import { popularity } from './fetchData.js'
import { createSavedButton } from './savedStorage.js'


function createHerofeaturedBox() {

    const section = document.createElement('section')
    section.className = 'main-container'
    const heroSetion = document.createElement('div')
    heroSetion.className = 'hero-section'
    const h = document.createElement('h1')
    h.className = 'hero-title'
    h.textContent = "Get ready to play, discover the best games."
    const hTwo = document.createElement('h4')
    hTwo.className = 'hero-text'
    hTwo.textContent = "Discover a massive library of the most exciting games across every genre — over 200 titles, completely free to play. No price tags, no barriers, just pure gaming."
    const btnBox = document.createElement('div')
    btnBox.classList = 'hero-actions'
    const btnOne = document.createElement('a')
    btnOne.href = '#/games'
    btnOne.className = 'hero-btn-primary'
    btnOne.textContent = 'Discover'
    const btnTwo = document.createElement('a')
    btnTwo.href = '#/about'
    btnTwo.className = 'hero-btn-outline'
    btnTwo.textContent = 'Learn More'

    section.appendChild(heroSetion)
    heroSetion.appendChild(h)
    heroSetion.appendChild(hTwo)
    heroSetion.appendChild(btnBox)
    btnBox.appendChild(btnOne)
    btnBox.appendChild(btnTwo)

    return section
}

async function createFeaturedGames() {
    const games = await popularity()
    const section = document.createElement('section')
    section.className = 'featured-section my-14'

    const titleLink = document.createElement('a')
    titleLink.href = '#/allGames'
    titleLink.className = 'section-heading'
    section.appendChild(titleLink)

    const titleBox = document.createElement('div')
    titleBox.className = 'section-heading-row  group'
    titleLink.appendChild(titleBox)

    const iconeLink = document.createElement('i')
    iconeLink.className = 'ti ti-arrow-badge-right text-2xl transition-transform group-hover:translate-x-2'

    const mainTitle = document.createElement('h2')
    mainTitle.className = 'text-4xl'
    mainTitle.textContent = 'Featured Games'
    titleBox.append(mainTitle, iconeLink)

    const featuredBox = document.createElement('div')
    featuredBox.className = 'featured-box'
    section.appendChild(featuredBox)

    const mainCover = document.createElement('div')
    mainCover.className = 'featured-cover'
    const mainImg = document.createElement('img')
    mainCover.appendChild(mainImg)
    featuredBox.appendChild(mainCover)

    const infoBox = document.createElement('div')
    infoBox.className = 'featured-info'
    mainCover.appendChild(infoBox)

    const gameName = document.createElement('h2')
    gameName.className = 'featured-name'
    const des = document.createElement('h4')
    des.className = 'featured-desc'
    const btnBox = document.createElement('div')
    btnBox.className = 'featured-actions'
    infoBox.append(gameName, des, btnBox)
    const btn1 = document.createElement('a')
    btn1.className = 'featured-btn-play'
    btn1.textContent = 'Play Now'
    const saveBtn = createSavedButton('btn-save')
    btnBox.append(btn1, saveBtn.button)

    const cards = document.createElement('div')
    cards.className = 'featured-list'
    featuredBox.appendChild(cards)

    const cardsArray = []
    games.forEach((game, i) => {

        const card = document.createElement('div')
        card.className = 'featured-item'

        const bar = document.createElement('div')
        bar.className = 'featured-bar'

        const thumb = document.createElement('img')
        thumb.className = 'featured-thumb'
        thumb.src = game.thumbnail
        thumb.alt = game.title

        const title = document.createElement('p')
        title.className = 'featured-item-title'
        title.textContent = game.title

        card.append(bar, thumb, title)
        cards.appendChild(card)

        card.addEventListener('click', () => showSlide(i))
        cardsArray.push({ card, bar })
    });

    let timer;
    let currentIndex;

    function showSlide(i) {
        clearTimeout(timer)
        currentIndex = i
        cardsArray.forEach(({ card, bar }) => {
            card.classList.remove('active')
            bar.classList.remove('featured-progress')
        })

        const { card, bar } = cardsArray[i]
        mainImg.classList.remove('show')
        infoBox.classList.remove('show')
        setTimeout(() => {
            mainImg.src = games[i].thumbnail
            mainImg.alt = games[i].title

            gameName.textContent = games[i].title
            des.textContent = games[i].short_description
            btn1.href = games[i].freetogame_profile_url

            saveBtn.setGame(games[i])

            mainImg.classList.add('show')
            infoBox.classList.add('show')
        }, 300)

        card.classList.add('active')
        void bar.offsetWidth
        bar.classList.add('featured-progress')

        timer = setTimeout(() => {
            showSlide((i + 1) % games.length)
        }, 5500)
    }

    showSlide(0)

    return section
}

async function createBrowseByCategory() {
    const games = await getData()
    const CATEGORIES = [
        { key: 'shooter', label: 'Shooter' },
        { key: 'mmorpg', label: 'MMORPG' },
        { key: 'racing', label: 'Racing' },
        { key: 'strategy', label: 'Strategy' },
        { key: 'moba', label: 'MOBA' },
        { key: 'sports', label: 'Sports' },
        { key: 'social', label: 'Social' },
        { key: 'fighting', label: 'Fighting' },
    ]
    const section = document.createElement('section')
    section.className = 'by-category'
    const titleLink = document.createElement('a')
    titleLink.href = '#/categories'
    titleLink.className = 'section-heading'
    section.appendChild(titleLink)

    const titleBox = document.createElement('div')
    titleBox.className = 'section-heading-row  group'
    titleLink.appendChild(titleBox)

    const iconeLink = document.createElement('i')
    iconeLink.className = 'ti ti-arrow-badge-right text-2xl transition-transform group-hover:translate-x-2'

    const mainTitle = document.createElement('h2')
    mainTitle.className = 'text-4xl'
    mainTitle.textContent = 'Browse by Category'
    titleBox.append(mainTitle, iconeLink)

    const cardsBox = document.createElement('div')
    cardsBox.className = 'home-cat-grid'
    section.appendChild(cardsBox)

    CATEGORIES.forEach(({ key, label }) => {
        const game = games.find(g => g.genre.toLowerCase() === key)

        const card = document.createElement('a')
        card.className = 'home-cat-card group'
        card.href = `#/category${key}`
        cardsBox.appendChild(card)

        const imgCategory = document.createElement('img')
        imgCategory.className = 'home-cat-img'
        imgCategory.src = game.thumbnail
        imgCategory.alt = game.label

        const hoverBox = document.createElement('div')
        hoverBox.className = 'home-cat-hover'

        const infoCard = document.createElement('div')
        infoCard.className = 'home-cat-info'

        card.append(imgCategory, hoverBox, infoCard)

        const hTitle = document.createElement('h2')
        hTitle.className = 'home-cat-title'
        hTitle.textContent = game.title
        const pPublisher = document.createElement('p')
        pPublisher.className = 'home-cat-publisher'
        pPublisher.textContent = `Publisher: ${game.publisher}`
        const categoryDiv = document.createElement('div')
        categoryDiv.className = 'home-cat-tag'
        const span = document.createElement('span')
        span.textContent = game.genre
        categoryDiv.appendChild(span)
        infoCard.append(hTitle, pPublisher, categoryDiv)

    })

    return section
}

export async function home() {
    const container = document.createElement('div')
    const herofeaturedBox = createHerofeaturedBox()
    const featuredGames = await createFeaturedGames()
    const browseByCategory = await createBrowseByCategory()
    container.append(herofeaturedBox, featuredGames, browseByCategory)

    return container
}


export default home;