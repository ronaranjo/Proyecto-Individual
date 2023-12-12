var validate = require('uuid-validate');

let allgames = [
    {id:1, genres:[{id:1}, {id:2}]},
    {id:"10adc0b6-7048-4d7b-9a40-a59dc6f98151", genres:[{id:4}, {id:3}]},
    {id:"103a1fb5-a213-4a4d-99a4-2f2c7f1fdedf", genres:[{id:4}, {id:3}]} 
]

let genres = [{id:1}, {id:2}, {id:4}, {id:3}]


const filterOrigin = (origin, allGames) =>{  

    let games = []

    if(origin === "database"){
        games = allGames.filter((game) => {
            return validate(game.id)
        })

    }else if(origin === "api"){
        games = allGames.filter((game) => {
            return (!validate(game.id))
        })

    }

    return games

}

const filterGender = (genre_id, allGames) => {

    if(genre_id){

        return allGames.filter((game) => {

            let match = false
            game.genres.forEach(genre => {
                if(genre.id === genre_id){
                    match = true
                }
            });

            return match
        })
    }
}

let origin = filterOrigin("database", allgames, genres)
let genre = filterGender(4, allgames)
let gamestoshow = [...origin, ...genre]


console.log(allgames);
// console.log(genre);