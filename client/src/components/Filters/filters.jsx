import style from "./filters.module.css"
import { useSelector, useDispatch } from "react-redux";
import { clear, filterGenre, filterOrigin, getAllGames, orderAscend, orderType,setGames } from "../../redux/actions";
import { useState } from "react";


const RAWG = "rawg.io"
const DATABASE = "database"

const ALPHA = "alpha"
const RATING = "rating"

export const Filters = () => {

    const [selectedButtons, setSelectedButtons] = useState([document.getElementById("ascending")])
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [allGamesSelected, setAllGameSelected] = useState(false)

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

        if (filtertype === "allgames") {

            
            removeBtnSelected("origin")
            dispatch(clear())
            if (state.allGames.length <= 15) {
                dispatch(getAllGames())
            }
            
        }

        if (filtertype === "origin") {
            if (state.filter.origin === value) {
                removeBtnSelected(filtertype)
                dispatch(filterOrigin(undefined))
                
            }else{
                removeBtnSelected(filtertype)
                removeBtnSelected("allgames")
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(filterOrigin(value))
            }
        }else if(filtertype === "genre"){

            if (state.filter.genre === value) {
                removeBtnSelected(filtertype)
                dispatch(filterGenre(undefined))   
            }else{
                removeBtnSelected(filtertype)
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(filterGenre(value))
            }
        }else if(filtertype === "type"){
            if(state.order.type === value) {
                removeBtnSelected(filtertype)
                dispatch(orderType(undefined))
            }else{
                removeBtnSelected(filtertype)
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(orderType(value))
            }
        }else{
            if(state.order.ascend !== value){
                removeBtnSelected(filtertype)
                setSelectedButtons([...selectedButtons, button])
                button.classList.add(style.btn_selected)
                dispatch(orderAscend(value))

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
                    <button className={style.btn} name="allgames" value={allGamesSelected} onClick={changeFilter}>All Games</button>
                    <button className={style.btn} name="origin" value={RAWG} onClick={changeFilter}>Rawg.io</button>
                    <button className={style.btn} name="origin" value={DATABASE} onClick={changeFilter}>Database</button>
                    
                </div>

                <div className={style.menu}>
                    <h1 className={style.filter_name}>Genre</h1>
                    {state.genres.map((genre) => {
                        return(
                            <button className={style.btn} name="genre" value={genre.name} onClick={changeFilter}>{genre.name}</button>
                        )
                    })}
                </div>

                <div className={style.menu}>
                <h1 className={style.filter_name}>Order</h1>
                    <button className={style.btn} name="type" value={ALPHA} onClick={changeFilter}>Alphabetic</button>
                    <button className={style.btn} name="type" value={RATING} onClick={changeFilter}>Rating</button>
                    <button className={style.btn} id="ascending" name="ascend" value={"a"} onClick={changeFilter}>Ascending</button>
                    <button className={style.btn} name="ascend" value={"b"} onClick={changeFilter}>Descending</button>
                </div>
            </div>

        </div>
    )
}