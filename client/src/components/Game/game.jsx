import style from "./Game.module.css"
import { Link } from "react-router-dom"

export const Game = (props) => {
    const{id, name, image, genres} = props
    return(
        <Link to={`/detail/${id}`} className={style.main_container}>
            <img className={style.img} src={image} alt="" />
            <p className={style.name}>{name}</p>

            <p className={style.genres_text}>Genres</p>
            <div className={style.genres}>

                {genres.map((gen) => {
                    return(
                        <p className={style.genre_name}>{gen.name}</p>
                    )
                })}
            </div>
        </Link>
    )

    
}