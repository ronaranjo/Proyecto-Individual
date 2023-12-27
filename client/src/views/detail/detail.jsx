import axios from "axios"
import style from "./detail.module.css"
import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"

export const Detail = () => {

    const {id} = useParams()

    const[game, setGame] = useState({
        platforms: [{platform: ""}],
        genres: []
    })

    useEffect(() => {
        const getGame = async () => {
            const response = await axios(`http://localhost:3001/videogames/${id}`)
            setGame(response.data)
        }

        getGame()
        
    }, [id])

    const setImage = () => {
        let image = ""
        if(game.image){
            image = `http://localhost:3001/images/${game.image}`
        }else{
            image = game.background_image
        }
        return image
    }
    
    console.log(game.platforms);

    return(
        <div className={style.main_container}>

            <div className={style.main_info}>
                <div className={style.img_container}>
                    <img className={style.img} src={setImage()} alt="" />
                </div>
                <h1 className={style.main_txt}>{game.name}</h1>
                
                <h2 className={style.main_txt}>Description</h2>
                <div className={style.info_container}>
                    <p className={style.description}>{game.description}</p>
                </div>
                
                <h2 className={style.main_txt}>Rating</h2>
                <h2 className={style.main_txt}>{game.rating}</h2>

            </div>
            

            <div className={style.second_info}>
                <h2>ID</h2>
                <p>{game.id}</p>
                <h2>Platforms</h2>
                <div className={style.info_container}>

                    {game.platforms.map((plat) => {
                        let name = ""
                        if (!plat.name) {
                            name = plat.platform.name
                        }else{
                            name = plat.name
                        }
                        return(
                            <p>{name}</p>
                        )
                    })}
                </div>

                <h2>Genre</h2>
                <div className={style.info_container}>

                    {game.genres.map((gen) => {
                        return(
                            <p>{gen.name}</p>
                        )
                    })}
                </div>

                <h2>Release</h2>
                <h2>{game.release}</h2>
            </div>
        </div>
    )
// ID.
// Nombre.
// Imagen.
// Plataformas.
// Descripción.
// Fecha de lanzamiento.
// Rating.
// Géneros.
}