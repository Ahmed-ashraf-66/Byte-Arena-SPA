import { releaseDate } from "./fetchData.js"

async function createNewReleaseDate() {
    const games = await releaseDate()
    console.log(games);

    const section = document.createElement('section')
    section.className = 'release-date'

    const titleLink = document.createElement('a')
    titleLink.href = '#/allGames'
    titleLink.className = 'section-release-heading'
    section.appendChild(titleLink)

    const titleBox = document.createElement('div')
    titleBox.className = 'section-heading-row  group'
    titleLink.appendChild(titleBox)

    const iconeLink = document.createElement('i')
    iconeLink.className = 'ti ti-arrow-badge-right text-2xl transition-transform group-hover:translate-x-2'

    const mainTitle = document.createElement('h2')
    mainTitle.className = 'text-4xl'
    mainTitle.textContent = 'Top Release Date'
    titleBox.append(mainTitle, iconeLink)

    const releaseBox = document.createElement('div')
    releaseBox.className = 'release-date-box'
    section.appendChild(releaseBox)

    const releaseGames = document.createElement('div')
    releaseGames.className = 'release-date-games'

    games.forEach(g => {
        const releaseCard = document.createElement('a')
        releaseCard.className = 'release-date-card'
        releaseCard.href = `game.html?id=${g.id}`
        releaseCard.target = '_balnk'
        releaseCard.rel = 'noopener'

        const releaseImg = document.createElement('img')
        releaseImg.src = g.thumbnail
        releaseImg.loading = 'lazy'

        const TextBox = document.createElement('div')
        TextBox.className = 'release-text-box'

        const releaseTitle = document.createElement('h3')
        releaseTitle.textContent = g.title

        const releasePublisher = document.createElement('h4')
        releasePublisher.textContent = g.publisher

        TextBox.append(releaseTitle, releasePublisher)
        releaseCard.append(releaseImg, TextBox)
        releaseGames.appendChild(releaseCard)
    });

    const releaseSlides = document.createElement('div')
    releaseSlides.className = 'release-date-sliders'

    const releaseDots = document.createElement('div')
    releaseDots.className = 'release-date-dots'

    const slides = []
    const dots = []
    let current = 0
    let timer

    function show(i) {
        slides[current].classList.remove('active')
        dots[current].classList.remove('active')
        current = i
        slides[current].classList.add('active')
        dots[current].classList.add('active')
    }

    function start() {
        clearInterval(timer)
        if (slides.length < 1) return
        timer = setInterval(() => show((current + 1) % slides.length), 3000)
    }
    games.forEach((g, i) => {
        const img = document.createElement('img')
        img.src = g.thumbnail
        img.alt = g.thumbnail
        slides.push(img)

        const dot = document.createElement('span')
        releaseDots.appendChild(dot)
        dots.push(dot)

        releaseSlides.append(img, releaseDots)
        releaseBox.append(releaseSlides, releaseGames)
    })

    if (slides.length > 0) {
        show(0)
        start()
    }

    return section
}

export async function trending() {
    const container = document.createElement('div')
    const newReleaseDate = await createNewReleaseDate()
    container.appendChild(newReleaseDate)
    return container
}

export default trending;