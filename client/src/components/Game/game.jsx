import style from "./Game.module.css"
import { Link } from "react-router-dom"

export const Game = (props) => {
    const{id, name, image, genres} = props
    return(
        <div className={style.main_container}>
            <img className={style.img} src={image} alt="" />
            <p className={style.name}>{name}</p>
            <div className={style.genres}>
                {genres.forEach(gen => {
                    return(
                        <p>{gen.name}</p>
                    )
                })};
            </div>
        </div>
    )

    
}