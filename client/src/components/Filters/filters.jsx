import style from "./filters.module.css"
import { useSelector, useDispatch } from "react-redux";
import { filterGenre, filterOrigin, orderAscend, orderType,setGames } from "../../redux/actions";
import { useEffect } from "react";


const RAWG = "rawg.io"
const DATABASE = "database"

const ALPHA = "alpha"
const RATING = "rating"

export const Filters = () => {

    const dispatch = useDispatch()

    const state = useSelector((state) => ({
        genres: state.genres,
        filter: state.filter,
        gamesToShow: state.gamesToShow,
        order: state.order
    }))

    const changeOrigin = (event)=>{

        dispatch(filterOrigin(event.target.value))
        dispatch(setGames())

    }

    const changeGenre = (event) => {

        dispatch(filterGenre(event.target.value))
        dispatch(setGames())

    }

    const changeType = (event)=>{

        dispatch(orderType(event.target.value))
        dispatch(setGames())
        
    }

    const changeAscend = (event) => {
        
        dispatch(orderAscend(event.target.value))
        dispatch(setGames())
        console.log(state.order.ascend);
    }


    return(
        <div className={style.main_container}>
            <div className={style.menu}>
                <h1 className={style.filter_name}>Origin</h1>
                <button className={style.filter} value={RAWG} onClick={changeOrigin}>Rawg.io</button>
                <button className={style.filter} value={DATABASE} onClick={changeOrigin}>Database</button>
                <button className={style.filter} value={undefined} onClick={changeOrigin}>All Games</button>
            </div>

            <div className={style.menu}>
                <h1 className={style.filter_name}>Genre</h1>
                {state.genres.map((genre) => {
                    return(
                        <button className={style.filter_genre} value={genre.name} onClick={changeGenre}>{genre.name}</button>
                    )
                })}
            </div>

            <div className={style.menu}>
            <h1 className={style.filter_name}>Order</h1>
                <button className={style.order} value={ALPHA} onClick={changeType}>{ALPHA}</button>
                <button className={style.order} value={RATING} onClick={changeType}>{RATING}</button>
                <button className={style.ascend} value={"a"} onClick={changeAscend}>ascendente</button>
                <button className={style.ascend} value={"b"} onClick={changeAscend}>descendente</button>
                
            </div>
        </div>
    )
}