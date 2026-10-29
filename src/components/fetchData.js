export const getData = async() => {
    try {
        const response = await fetch('https://www.freetogame.com/api/games')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log('Faild Fetch', error);
    }
}

export const getGame = async(id) => {
    try {
        const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`)

        if (!response.ok) {
            throw new Error(`HTTP Erorr ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Faild Fetch', error);
    }
}

export const popularity = async() => {
    try {
        const response = await fetch('https://www.freetogame.com/api/games?sort-by=popularity')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.slice(0, 8)
    } catch (error) {
        console.log('Faild Fetch', error)
    }
}

export const releaseDate = async() => {
    try {
        const response = await fetch('https://www.freetogame.com/api/games?sort-by=release-date')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.slice(0, 8)
    } catch (error) {
        console.log('Faild Fetch', error)
    }
}

export default { getData, releaseDate, popularity };