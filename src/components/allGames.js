import { getData } from "./fetchData.js"
import { createSavedButton } from "./savedStorage.js"

async function createGridAndPagination() {
    const games = await getData()

    const section = document.createElement('section')
    section.className = 'category-grid'

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
    mainTitle.textContent = 'All Games'
    titleBox.append(mainTitle, iconeLink)

    const catBody = document.createElement('div')
    catBody.className = 'games-body flex gap-4 justify-between max-w-7xl mt-7 mx-auto'

    const sortBox = document.createElement('div')
    sortBox.className = 'games-sort'
    const sortHeader = document.createElement('h3')
    sortHeader.textContent = 'Sort by'
    const select = document.createElement('select')
    select.className = 'games-select'
    const option_1 = document.createElement('option')
    option_1.textContent = 'Newest'
    const option_2 = document.createElement('option')
    option_2.textContent = 'Most popular'
    const option_3 = document.createElement('option')
    option_3.textContent = 'A-Z'
    sortBox.append(sortHeader, select)
    select.append(option_1, option_2, option_3)

    select.addEventListener('change', () => {
        sort = select.value
        page = 1
        render()
    })



    let page = 1
    let isSelected = []
    const PER_PAGE = 12
    let TOTAL_PAGES = Math.ceil(games.length / PER_PAGE)
    let sort = 'Newest'

    const allGenre = [...new Set(games.map(g => g.genre))]
    const allPlatform = [...new Set(games.map(g => g.platform))]

    const categoryBox = document.createElement('div')
    categoryBox.className = 'games-filters'

    const ulGenre = document.createElement('ul')
    ulGenre.className = 'games-filter-scroll'
    const ulPlatform = document.createElement('ul')
    const genreTitle = document.createElement('h4')
    genreTitle.textContent = 'Category'
    const platformTitle = document.createElement('h4')
    platformTitle.textContent = 'Platform'
    categoryBox.append(genreTitle, ulGenre, platformTitle, ulPlatform)

    allGenre.forEach(genre => {
        const li = document.createElement('li')
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.type = "checkbox"
        input.className = 'games-check'
        input.value = genre
        const span = document.createElement('span')
        span.textContent = genre

        input.addEventListener('change', () => {
            isSelected = [...ulGenre.querySelectorAll('.games-check:checked')].map(c => c.value)
            page = 1
            render()
        })

        label.append(input, span)
        li.appendChild(label)
        ulGenre.appendChild(li)

    })
    allPlatform.forEach(platform => {
        const li = document.createElement('li')
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.type = "checkbox"
        input.className = 'games-check'
        input.value = platform
        const span = document.createElement('span')
        span.textContent = platform

        input.addEventListener('change', () => {
            isSelected = [...ulPlatform.querySelectorAll('.games-check:checked')].map(c => c.value)
            page = 1
            render()
        })

        label.append(input, span)
        li.appendChild(label)
        ulPlatform.appendChild(li)

    })

    const grid = document.createElement('div')
    grid.className = 'games-grid'

    const politsBox = document.createElement('div')
    politsBox.className = 'games-pager'

    const nextBtn = document.createElement('span')
    nextBtn.className = 'games-pager-btn'
    nextBtn.addEventListener('click', () => {
        if (page < TOTAL_PAGES) {
            page++
            render()
        }
    })

    const nextIcone = document.createElement('i')
    nextIcone.className = 'ti ti-chevron-right'
    nextBtn.appendChild(nextIcone)

    const prevBtn = document.createElement('span')
    prevBtn.className = 'games-pager-btn'
    prevBtn.addEventListener('click', () => {
        if (page > 1) {
            page--
            render()
        }
    })

    const prevIcone = document.createElement('i')
    prevIcone.className = 'ti ti-chevron-left'
    prevBtn.appendChild(prevIcone)

    function getVisible() {
        const list = games.filter(g => isSelected.length === 0 || isSelected.includes(g.genre) || isSelected.includes(g.platform))
        if (sort === 'Newest') {
            list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        }
        if (sort === 'A-Z') {
            list.sort((a, b) => a.title.localeCompare(b.title))
        }
        return list

    }

    function getPage(current, total) {
        const size = 5
        let start = current - 2
        start = Math.min(start, total - size + 1)
        start = Math.max(start, 1)
        const end = Math.min(start + size - 1, total)

        const pages = []
        for (let p = start; p <= end; p++) pages.push(p)
        return pages
    }

    function render() {
        const visible = getVisible()
        console.log(visible);

        TOTAL_PAGES = Math.max(1, Math.ceil(visible.length / PER_PAGE))
        if (page > TOTAL_PAGES) page = TOTAL_PAGES
        const start = (page - 1) * PER_PAGE
        const pageGame = visible.slice(start, start + PER_PAGE)

        grid.innerHTML = ''

        pageGame.forEach((game, i) => {
            const card = document.createElement('a')
            card.className = 'games-card group games-card-enter'
            card.style.animationDelay = `${i * 20}ms`
            card.href = `game.html?id=${game.id}`
            card.target = '_blank'
            card.rel = 'noopener'

            const imgGame = document.createElement('img')
            imgGame.alt = game.title
            imgGame.loading = 'lazy'
            imgGame.className = 'games-card-img'
            imgGame.onload = () => imgGame.classList.add('loaded')
            imgGame.src = game.thumbnail

            const hoverBox = document.createElement('div')
            hoverBox.className = 'games-card-hover'

            const infoCard = document.createElement('div')
            infoCard.className = 'games-card-info'

            const categoryDiv = document.createElement('div')
            categoryDiv.className = 'games-card-tag'
            const span = document.createElement('span')
            span.textContent = game.genre
            categoryDiv.appendChild(span)

            const saveDiv = document.createElement('div')
            saveDiv.className = 'games-card-save'
            const saveBtn = createSavedButton('games-card-save-a')
            saveDiv.appendChild(saveBtn.button)

            console.log(game);
            saveBtn.setGame(game)

            card.append(imgGame, categoryDiv, saveDiv, hoverBox, infoCard)

            const hTitle = document.createElement('h2')
            hTitle.className = 'games-card-title'
            hTitle.textContent = game.title
            const pPublisher = document.createElement('p')
            pPublisher.className = 'games-card-publisher'
            pPublisher.textContent = `Publisher: ${game.publisher}`
            const pDesc = document.createElement('p')
            pDesc.className = 'games-card-desc'
            pDesc.textContent = game.short_description
            infoCard.append(pPublisher, pDesc)
            card.appendChild(hTitle)
            grid.appendChild(card)
        });
        politsBox.innerHTML = ''
        politsBox.appendChild(prevBtn)

        getPage(page, TOTAL_PAGES).forEach(p => {
            const polit = document.createElement('span')
            polit.classList = 'games-pager-btn' + (p === page ? ' active' : '')
            polit.textContent = p
            polit.addEventListener('click', () => {
                page = p
                render()
            })
            politsBox.appendChild(polit)
        })
        politsBox.appendChild(nextBtn)
    }

    render()
    catBody.append(categoryBox, grid)
    section.append(sortBox, catBody, politsBox)

    return section
}

export async function allGames() {
    const container = document.createElement('div')
    const gridAndPagination = await createGridAndPagination()
    container.appendChild(gridAndPagination)
    return container
}

export default allGames