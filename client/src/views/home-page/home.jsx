import style from "./home.module.css"
import{ GameViewer } from "../../components/GameViewer/gameViewer"
import { Filters } from "../../components/Filters/filters"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, setGames } from "../../redux/actions";
import { v4 as uuidv4, validate } from 'uuid';


export const Home = () => {
    
    const dispatch = useDispatch()

    const state = useSelector((state) => ({
        gamesToShow: state.gamesToShow,
        filter: state.filter,
    }))
    

    useEffect(()=>{
        
        dispatch(setGames())
        
        console.log(state.gamesToShow);
    
    }, [dispatch])
    

    return (
        <div className={style.main_container}>
            <Filters></Filters>
            <GameViewer games = {state.gamesToShow}/>
            
        </div>
        
    )
}