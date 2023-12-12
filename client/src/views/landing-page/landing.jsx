import style from "./landing.module.css"
import { Link } from 'react-router-dom';
const VALORANT = "https://media.vandal.net/m/78531/valorant-202052910331074_1.jpg"
const FIFA = "https://pbs.twimg.com/media/F1ALfw4XoAAm1UW.jpg"
const CS = "https://cdn.sanity.io/images/hdokr93d/production/5c57ed5aba24492b9460f49fda8f9a220b0a8236-1200x1200.jpg?rect=150,0,900,1200&w=600&h=800"

export const Landing = () => {
    return(
        <div className={style.main_container}>

            <div className={style.images_container}>
                <img className={style.image} src={VALORANT} alt="" />
                <img className={style.image} src={FIFA} alt="" />
                <img className={style.image} src={CS} alt="" />
            </div>
            
            <div className={style.text_container}>
                <h1 className={style.title}>RoNaranjo VideoGames</h1>
                <h2 className={style.subtitle}>All games in one site</h2>
                <Link className={style.button} to="/home">Press to continue</Link>
            </div>
        </div>
    )
}