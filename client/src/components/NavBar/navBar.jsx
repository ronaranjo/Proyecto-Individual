import style from "./navBar.module.css"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return(
        <div className={style.main_container}>
            <Link className={style.button} to="/home"> RN Games </Link>
            <div className={style.menu_container}>
                <Link className={style.button} to="/home"> Home </Link>
                <Link className={style.button} to="/"> Inicio </Link>
                <Link className={style.button} to="/form"> Form </Link>
            </div>
        </div>
    )
}