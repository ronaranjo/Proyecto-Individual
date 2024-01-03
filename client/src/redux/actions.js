import {GET_ALL_GAMES,GET_GENRES, GET_PLATFORMS, SET_GAMES, FILTER_GAMES, SORT_GAMES, SEARCH, CLEAR} from "./actiontypes";
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

export const filterGames = (value, type) => {
    return{
        type: FILTER_GAMES,
        payload: {value, type}
    }
}

export const sortGames = (value, type) => {
    return{
        type: SORT_GAMES,
        payload: {value, type}
    }
}

export const clear = () => {
    return{
        type: CLEAR,
        payload: {
            filter:{
                origin: undefined,
                genre: undefined
            },
            order: {
                type: undefined,
                ascend: undefined
            },
        }
    }
}


