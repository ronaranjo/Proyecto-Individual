import {GET_ALL_GAMES,GET_GENRES, GET_PLATFORMS, SET_GAMES, FILTER_GENRE, FILTER_ORIGIN, ORDER_TYPE, ORDER_ASCEND, SEARCH} from "./actiontypes";
import axios from "axios"
const URL_GAMES= "http://localhost:3001/videogames"
const URL_GENRES= "http://localhost:3001/genres"
const URL_PLATFORMS= "http://localhost:3001/platforms"
 
 
export const getAllGames = () =>{

        return async function(dispatch){
            try{
                const response = await axios.get(URL_GAMES)
                return dispatch({
                    type: GET_ALL_GAMES,
                    payload: response.data,
                })
            }catch (error) {
                console.log({error: error.message})
            }
        }
    }

export const getGenres = () => {

    return async function(dispatch){
        try{
            const response = await axios.get(URL_GENRES)
            return dispatch({
                type: GET_GENRES,
                payload: response.data,
            })
        }catch (error) {
            console.log({error: error.message})
        }
    }
}

export const getPlatforms = () => {

    return async function(dispatch){
        try{
            const response = await axios.get(URL_PLATFORMS)
            return dispatch({
                type: GET_PLATFORMS,
                payload: response.data,
            })
        }catch (error) {
            console.log({error: error.message})
        }
    }
}

export const searchGames = (name) => {
    return async function(dispatch){
        try{
            const response = await axios.get(`${URL_GAMES}/name/search?name=${name}`)
            return dispatch({
                type: SEARCH,
                payload: response.data,
            })
        }catch (error) {
            console.log({error: error.message})
        }
    }
}

export const setGames = () => {
    return{
        type: SET_GAMES
    }
}

export const filterOrigin = (value) => {
    return{
        type: FILTER_ORIGIN,
        payload: value
    }
}

export const filterGenre = (value) => {
    return{
        type: FILTER_GENRE,
        payload: value
    }
}

export const orderType = (value) => {
    return{
        type: ORDER_TYPE,
        payload: value
    }
}

export const orderAscend = (value) => {
    return{
        type: ORDER_ASCEND,
        payload: value
    }
}


