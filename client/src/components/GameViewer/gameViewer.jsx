import style from "./gameViewer.module.css"
import { Game} from "../Game/game"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { v4 as uuidv4, validate } from 'uuid';

export const GameViewer = (props) => {

    const {games} = props

    const conditions = useSelector((state) => ({
      filter: state.filter,
      order: state.order
  }))

    const[gamesPage, setGamesPage] = useState(games)
    const[page, setPage] = useState(1)
    const[slicer, setSlicer] = useState({start: 0, end:15, limit:15})

    const prevPage = () =>{
        if(page > 1){
            let new_start = slicer.start - slicer.limit
            let new_end = slicer.start
    
            setSlicer({...slicer, start: new_start, end: new_end})
            setPage(page - 1)
            
        }
    }

    const nextPage = () =>{
    
      if(page < Math.ceil(games.length/slicer.limit)){
          let new_start = slicer.end
          let new_end = slicer.end + slicer.limit

          setSlicer({...slicer, start: new_start, end: new_end})
          setPage(page + 1)
          
      }  
    }

    useEffect(()=>{
      
      if(games.length < gamesPage.length){
        setSlicer({start: 0, end:15, limit:15})
        setPage(1)
      }

      setGamesPage(games.slice(slicer.start, slicer.end))
      
        
    },[setGamesPage, games, slicer])
      
    return(
      <div className={style.main_container}>
        <div className={style.game_container}>
          {gamesPage.map((game) => {

              let image = ""
              if(game.image){
                image = game.image
              }else{
                image = game.background_image
              }

              return(
                  <Game
                      id = {game.id}
                      name = {game.name}
                      image = {image}
                      genres={game.genres}
                  />
              )
              })}
        </div>

        <div className={style.pageIndex}>
                <button onClick={prevPage}>{"<"}</button>
                <p className={style.page}>{page}</p>
                <button onClick={nextPage}>{">"}</button>
        </div>
      </div>
    )
    
}