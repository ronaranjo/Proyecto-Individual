import { v4 as uuidv4, validate } from 'uuid';

export const filterOrigin = (filter, allGames) =>{  

    let games = []

    if(filter === "database"){
        games = allGames.filter((game) => {
            return validate(game.id)
        })

    }else if(filter === "rawg.io"){
        games = allGames.filter((game) => {
            return (!validate(game.id))
        })

    }

    return games
}

export const filterGenre = (genre_name, allGames) => {

    let games = []
    
    if(genre_name){

        games =  allGames.filter((game) => {

            let match = false
            game.genres.forEach(genre => {
                if(genre.name === genre_name){
                    match = true
                }
            });

            return match
        })
    }
    return games
}

export const orderAlphabetical = (ascend, allGames) => {

    if(ascend === "a" || !ascend){
        return allGames.sort((a,b) => {

            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })

    }else{
        return allGames.sort((a,b) => {

            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
            } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    }
}

export const orderRating = (ascend, allGames) => {

    if(ascend === "a" || !ascend){
        return allGames.sort((a,b) => {
            return a.rating - b.rating
        })
    }else{
        return allGames.sort((a,b) => {
            return b.rating - a.rating
    })
    }
}