import style from "./filters.module.css"
import { useSelector, useDispatch } from "react-redux";
import { clear, filterGames, getAllGames, orderAscend, sortGames, setGames, sortGamesetGames } from "../../redux/actions";
import { useEffect, useState } from "react";


const RAWG = "rawg.io"
const DATABASE = "database"
const ALPHABETIC = "alphabetic"
const RATING = "rating"
const  ALLGAMES = "allgames"
const ORIGIN = "origin"
const GENRE = "genre"
const ASCEND = "ascend"
const TYPE = "type"

export const Filters = () => {

    const [selectedButtons, setSelectedButtons] = useState([document.getElementById("ascending")])
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const removeBtnSelected = (name) => {
        setSelectedButtons(selectedButtons.filter((element) =>{
            if(element){
                if(element.name === name){
                element.classList.remove(style.btn_selected)

                if (!element.classList.contains(style.btn)) {
                    element.classList.add(style.btn)
                }

                return true
            }
            }
        }))
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dispatch = useDispatch()

    const state = useSelector((state) => ({
        genres: state.genres,
        filter: state.filter,
        allGames: state.allGames,
        gamesToShow: state.gamesToShow,
        order: state.order
    }))

    const changeFilter = (event)=>{
        const button = event.target
        const filtertype = event.target.name
        const value = event.target.value

        if (filtertype === ALLGAMES) {

            removeBtnSelected(ORIGIN)
            removeBtnSelected(GENRE)
            removeBtnSelected(TYPE)
            removeBtnSelected(ASCEND)
            dispatch(clear())
            if (state.allGames.length <= 15) {
                dispatch(getAllGames())
            }
        }

        if (filtertype === ORIGIN || filtertype === GENRE) {
            if (state.filter[filtertype] === value) {
                removeBtnSelected(filtertype)
                dispatch(filterGames(undefined, filtertype))
                
            }else{
                removeBtnSelected(filtertype)
                removeBtnSelected(ALLGAMES)
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(filterGames(value, filtertype))
            }

        }else if(filtertype === TYPE || filtertype === ASCEND){

            if(state.order[filtertype] === value) {
                removeBtnSelected(filtertype)
                removeBtnSelected(ASCEND)
                dispatch(sortGames(undefined, filtertype))

            }else{
                removeBtnSelected(filtertype)
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(sortGames(value, filtertype))
            }
        }
        dispatch(setGames())
    }
    return(
        <div className={style.main_container}>
            <button className={style.btn_menu} onClick={toggleDropdown}>
                {isDropdownOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <div className={isDropdownOpen ? style.dropdownContent : style.hideDropdownContent}>
                <div className={style.menu}>
                    <h1 className={style.filter_name}>Origin</h1>
                    <button className={style.btn} name={ALLGAMES} onClick={changeFilter}>All Games</button>
                    <button className={style.btn} name={ORIGIN} value={RAWG} onClick={changeFilter}>Rawg.io</button>
                    <button className={style.btn} name={ORIGIN} value={DATABASE} onClick={changeFilter}>Database</button>
                    
                </div>

                <div className={style.menu}>
                    <h1 className={style.filter_name}>Genre</h1>
                    {state.genres.map((genre) => {
                        return(
                            <button className={style.btn} name={GENRE} value={genre.name} onClick={changeFilter}>{genre.name}</button>
                        )
                    })}
                </div>

                <div className={style.menu}>
                <h1 className={style.filter_name}>Order</h1>
                    <button className={style.btn} name={TYPE} value={ALPHABETIC} onClick={changeFilter}>Alphabetic</button>
                    <button className={style.btn} name={TYPE} value={RATING} onClick={changeFilter}>Rating</button>
                    <button className={style.btn} name={ASCEND} value={"a"} onClick={changeFilter}>Ascending</button>
                    <button className={style.btn} name={ASCEND} value={"b"} onClick={changeFilter}>Descending</button>
                </div>
            </div>

        </div>
    )
}