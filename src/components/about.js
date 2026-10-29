const EMAIL = 'ahmedachrf09@gmail.com'
const FREETOGAME_URL = 'https://www.freetogame.com'

const FEATURES = [
    { lead: 'Home.', text: 'A featured showcase of the most popular games right now. It rotates on its own, or you can jump to any game with a click. Below it, you can browse by category: Shooter, MMORPG, Racing, Strategy, MOBA, Sports, Social and Fighting.' },
    { lead: 'All Games.', text: 'The full library in one grid. Filter by genre and platform (PC or browser), sort by newest or A–Z, and flip through the pages.' },
    { lead: 'Game Pages.', text: 'Every game has its own page with a banner, the publisher and developer, the release date, a screenshot slideshow, and a row of similar games. It opens in a new tab, so you never lose your place in the arena.' },
    { lead: 'Trending.', text: "What's hot right now. See the newest releases and the most popular games at a glance." },
    { lead: 'Surprise Me.', text: "Can't decide what to play? Spin the reel and let ByteArena pick a random game for you." },
    { lead: 'Saved Games.', text: 'Tap the bookmark on any game to keep it for later. Your list is stored in your own browser, so it stays private to you.' },
]

const STEPS = [
    { lead: 'Discover.', text: 'Browse the showcase, categories, or the full library.' },
    { lead: 'Explore.', text: 'Open a game page and check the details, screenshots, and similar games.' },
    { lead: 'Play.', text: "Jump straight to the game's own page and start playing." },
]

const CHEAT_CODES = [
    { lead: 'Hover any game card', text: 'to reveal the publisher and a short description.' },
    { lead: 'Click the small cards beside the Home showcase', text: 'to jump straight to that game.' },
    { lead: 'Combine filters.', text: 'Pick a genre and a platform together to narrow things down fast.' },
    { lead: 'Hit the bookmark', text: 'while a game is on screen to save it for later.' },
]

const RULES = [
    { lead: 'Free means free.', text: 'Every game listed is free to play.' },
    { lead: 'Simple beats flashy.', text: 'Fast pages, clear information, no clutter.' },
    { lead: 'Your data stays yours.', text: "Saved games live in your browser. We don't collect them." },
    { lead: "Credit where it's due.", text: 'Every game belongs to its creators, and we always point you to the official source.' },
]

const FAQ = [
    { q: 'Is everything really free?', a: "Every game listed is free to play. Some may offer optional in-game purchases, and that's up to each game." },
    { q: 'Can I play or download games on ByteArena?', a: "No. We help you discover games, and the Play buttons take you to each game's own page." },
    { q: 'Why do some games show different details?', a: "Not every game comes with the same information. Browser games, for example, usually don't list system requirements." },
    { q: 'Where are my saved games stored?', a: 'In your browser, on your device. Clearing your site data will remove them.' },
    { q: 'How often does the library update?', a: 'The catalog is loaded live from FreeToGame, so new games show up as soon as they are added there.' },
]

const RADAR = [
    { lead: 'Stats:', text: 'the library in numbers, from top genres to most prolific publishers.' },
    { lead: 'Publisher Spotlight:', text: 'browse games by studio.' },
    { lead: 'Smarter search:', text: 'suggestions as you type.' },
]

function createEl(tag, className, text) {
    const el = document.createElement(tag)
    if (className) el.className = className
    if (text) el.textContent = text
    return el
}

function createLink(text, href) {
    const link = createEl('a', 'about-link', text)
    link.href = href
    link.target = '_blank'
    link.rel = 'noopener'
    return link
}

function createList(items, tag = 'ul') {
    const list = createEl(tag, tag === 'ol' ? 'about-steps' : 'about-list')
    items.forEach(({ lead, text }) => {
        const li = createEl('li')
        li.append(createEl('strong', 'about-lead', lead), ` ${text}`)
        list.appendChild(li)
    })
    return list
}

function createSection(title, ...children) {
    const section = createEl('section', 'about-section')
    section.append(createEl('h2', 'about-section-title', title), ...children)
    return section
}

export function about() {
    const container = createEl('div', 'about-page')

    // Hero
    const hero = createEl('section', 'about-hero')
    hero.append(
        createEl('span', 'about-eyebrow', 'Press Start'),
        createEl('h1', 'about-title', 'About ByteArena'),
        createEl('p', 'about-tagline', 'Free games. Zero price tags. Endless worlds.'),
        createEl('p', 'about-text', 'ByteArena is a home for free-to-play gaming. We bring hundreds of games across every genre into one place, so you can spend less time searching and more time playing. Whether you want a quick browser game for a coffee break or a massive PC world to get lost in, your next favorite game starts here.')
    )

    // Data source (with link)
    const dataText = createEl('p', 'about-text')
    dataText.append(
        'All game information, thumbnails, and screenshots are provided by ',
        createLink('FreeToGame', FREETOGAME_URL),
        " (freetogame.com), a free-to-play games database. ByteArena is an independent project and isn't affiliated with FreeToGame or with any game's publisher. Game names, logos, and trademarks belong to their respective owners."
    )

    // FAQ
    const faq = createEl('div')
    FAQ.forEach(({ q, a }) => {
        faq.append(createEl('h3', 'about-question', q), createEl('p', 'about-answer', a))
    })

    // Contact (with email link)
    const helloText = createEl('p', 'about-text')
    const emailLink = createLink(EMAIL, `mailto:${EMAIL}`)
    emailLink.removeAttribute('target')
    helloText.append('Found a bug, have an idea, or just want to talk games? Reach out at ', emailLink, '.')

    // Footer note
    const note = createEl('p', 'about-note')
    note.append('Game data provided by ', createLink('FreeToGame', FREETOGAME_URL), '.')

    container.append(
        hero,
        createSection("What You'll Find Inside", createList(FEATURES)),
        createSection('How It Works', createList(STEPS, 'ol')),
        createSection('Cheat Codes', createEl('p', 'about-text', 'A few tricks most visitors miss:'), createList(CHEAT_CODES)),
        createSection('The Arena Rules', createList(RULES)),
        createSection('Where the Data Comes From', dataText),
        createSection('Questions Players Ask', faq),
        createSection('Built By a Player, For Players', createEl('p', 'about-text', 'ByteArena started as a learning project: a single-page website built with plain JavaScript, no frameworks, and styled with Tailwind CSS. The icons come from Tabler, and the fonts are Orbitron and Exo 2. Every page, filter, and animation was written by hand, one level at a time.')),
        createSection('On the Radar', createEl('p', 'about-text', 'Ideas for future updates:'), createList(RADAR)),
        createSection('Say Hello', helloText),
        note
    )

    return container
}

export default about