const KEY = 'saveGames'

export function createSavedButton(className) {
    let currentGame = null

    const button = document.createElement('a')
    button.className = className
    const iconeSaved = document.createElement('i')
    button.appendChild(iconeSaved)

    function getSaved() {
        return JSON.parse(localStorage.getItem(KEY)) || []
    }

    function updateIcon() {
        const isSaved = currentGame ? getSaved().some(g => g.id === currentGame.id) : false
        iconeSaved.className = 'ti text-lg ' + (isSaved ? 'ti-bookmark-minus' : 'ti-bookmark-plus')
    }

    button.addEventListener('click', (e) => {
        e.preventDefault()
        if (!currentGame) return

        const saved = getSaved()
        const index = saved.findIndex(g => g.id === currentGame.id)
        if (index === -1) saved.push(currentGame)
        else saved.splice(index, 1)
        localStorage.setItem(KEY, JSON.stringify(saved))

        updateIcon()
    })

    updateIcon()

    return {
        button,
        setGame(game) {
            currentGame = game
            updateIcon()
        }
    }
}