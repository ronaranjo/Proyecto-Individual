import {GET_ALL_GAMES,GET_GENRES, FILTER_GENRE, FILTER_ORIGIN, SEARCH, SET_GAMES, ORDER_TYPE, ORDER_ASCEND, GET_PLATFORMS} from "./actiontypes";
import { filterOrigin, filterGenre, orderAlphabetical, orderRating } from "./utils";

const initialState = {

    allGames: [],
    gamesToShow: [],
    genres: [],
    platforms: [],
    filter:{
        origin: undefined,
        genre: undefined
    },
    order: {
        type: undefined,
        ascend: "a"
    },
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_GAMES:

            let games_aux = []

            if(state.allGames.length > 0){
                games_aux = [...state.allGames]

                if(state.filter.origin){
                    games_aux = filterOrigin(state.filter.origin, games_aux)
                }

                if(state.filter.genre) {
                    games_aux = filterGenre(state.filter.genre, games_aux)
                }

                if(state.order.type){
                    if (state.order.type === "alpha") {
                        games_aux = orderAlphabetical(state.order.ascend, games_aux)

                    }else if(state.order.type === "rating"){
                        games_aux = orderRating(state.order.ascend, games_aux)
                    }
                }

            }else{
                return{...state, gamesToShow: state.allGames}
            }

            return {...state, gamesToShow: games_aux}

        case GET_ALL_GAMES:

            return {...state, allGames: payload}

        
        case GET_GENRES:
            
            return {...state, genres: payload}

        case GET_PLATFORMS:
            
            return {...state, platforms: payload}


        case SEARCH:
            
            return {...state, allGames: payload}

                
        case FILTER_ORIGIN:
            return{...state, filter: {...state.filter, origin: payload}}

        
        case FILTER_GENRE:
            
            return{...state, filter: {...state.filter, genre: payload}}


        case ORDER_TYPE:

            return{...state, order: {...state.order, type: payload}}


        case ORDER_ASCEND:

            return{...state, order: {...state.order, ascend: payload}}


        default:
            return{...state}
    }
}

export default rootReducer