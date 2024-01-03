import style from "./home.module.css"
import{ GameViewer } from "../../components/GameViewer/gameViewer"
import { Filters } from "../../components/Filters/filters"
import { SearchBar } from "../../components/SearchBar/searchBar"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setGames } from "../../redux/actions";


export const Home = () => {

    return (
        <div className={style.main_container}>
            <SearchBar></SearchBar>
            <div className={style.games_container}>
                <Filters></Filters>
                <GameViewer/>
            </div>
        
        </div>
        
    )
}