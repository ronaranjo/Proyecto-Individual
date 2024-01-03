import style from "./gameViewer.module.css"
import { Game} from "../Game/game"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react"
import { setGames } from "../../redux/actions";

export const GameViewer = () => {

  const dispatch = useDispatch()

  const state = useSelector((state) => ({
      gamesToShow: state.gamesToShow,
  }))

    const[gamesPage, setGamesPage] = useState([])
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
    
      if(page < Math.ceil(state.gamesToShow.length/slicer.limit)){
          let new_start = slicer.end
          let new_end = slicer.end + slicer.limit

          setSlicer({...slicer, start: new_start, end: new_end})
          setPage(page + 1)
          
      }  
    }

    useEffect(()=>{

      if (!state.gamesToShow.length) {
        dispatch(setGames());
      }

      if(state.gamesToShow.length < gamesPage.length){
        setSlicer({start: 0, end:15, limit:15})
        setPage(1)
      }
  
      setGamesPage(state.gamesToShow.slice(slicer.start, slicer.end))
      
    },[, state.gamesToShow, slicer])
      
    return(
      <div className={style.main_container}>
        <div className={style.game_container}>
          {gamesPage.map((game) => {

              let image = ""
              if(game.image){
                image = `http://localhost:3001/images/${game.image}`
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
                <button className={style.btn} onClick={prevPage}>{"<"}</button>
                <h2 className={style.page}>{page}</h2>
                <button className={style.btn} onClick={nextPage}>{">"}</button>
        </div>
      </div>
    )
    
}