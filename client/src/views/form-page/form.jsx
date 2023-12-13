import style from "./form.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { validations } from "./validations"
import { useSelector } from "react-redux";

export const Form = () => {

    const genres = useSelector((state) => state.genres)

    const [gameProps, setGameProps] = useState({
        name:'',
        image:'',
        description: '',
        plataforms: [],
        release:'',
        rating: 0,
        genres:[]

    })

    const[errors, setErrors] = useState({})

    function handleChange(event){
        const property = event.target.name;
        const value = event.target.value;
        

        setGameProps({...gameProps, [property]:value})
        validations({...gameProps, [property]:value},errors, setErrors)
        
    }

    const handlePlataforms = (event) => {
        event.preventDefault()
        const value = document.getElementById("input_plataforms").value
        console.log(value);
        if(!gameProps.plataforms.includes(value.toLowerCase())){
            setGameProps({...gameProps, plataforms:[...gameProps.plataforms, value.toLowerCase()]})
        }

        console.log(gameProps.plataforms);
    }

    const handleGenres = (event) => {
        event.preventDefault()
        const button = event.target;
        const value = event.target.value

        if(!gameProps.genres.includes(value)){
            setGameProps({...gameProps, genres: [...gameProps.genres, value]})
            button.classList.add(style.genre_button_selected)
        }else{
            button.classList.remove(style.genre_button_selected)
            setGameProps({...gameProps, genres: gameProps.genres.filter((g) => g !== value)})
        }

        
        console.log(gameProps);
    }

    function handleSubmit(event){
        event.preventDefault()
        //se sube el archivo
    }

    return (
        <div className={style.main_container}>
            <form className={style.form_container}>

                <div className={style.input_container} >
                    <p className={style.error}>{errors.name}</p>
                    <label className={style.label} htmlFor="name">Name</label>
                    <input className={style.input} type="text" name='name' value={gameProps.name} onChange={handleChange}/>
                </div>

                <div className={style.input_container} >

                    <p className={style.error}>{errors.image}</p>
                    <label className={style.label} htmlFor="image">Image (url)</label>
                    <input className={style.input} type="text" name='image' value={gameProps.image} onChange={handleChange}/>
                </div>

                <div className={style.input_container} >

                    <p className={style.error}>{errors.description}</p>
                    <label className={style.label} htmlFor="description">Description</label>
                    <input className={style.input} type="text" name='description' value={gameProps.description} onChange={handleChange}/>
                </div>

                <div className={style.input_container} >

                    <p className={style.error}>{errors.plataforms}</p>
                    <label className={style.label} htmlFor="plataforms">Plataforms</label>
                    <input className={style.input} type="text" name='plataforms' id="input_plataforms" />
                    <button className={style.add_button} onClick={handlePlataforms}>Add</button>
                </div>

                <div className={style.input_container} >

                    <p className={style.error}>{errors.plataforms}</p>
                    <label className={style.label} htmlFor="plataforms">Release</label>
                    <input className={style.input} type="text" name='release' value={gameProps.release} onChange={handleChange}/>
                </div>

                <div className={style.input_container} >

                    <p className={style.error}>{errors.plataforms}</p>
                    <label className={style.label} htmlFor="plataforms">Rating</label>
                    <input className={style.input} type="text" name='rating' value={gameProps.rating} onChange={handleChange}/>
                </div>


                <div className={style.input_container} >

                    <p className={style.error}>{errors.description}</p>
                
                    <label className={style.label} htmlFor="genres">Genres</label>

                        <div className={style.selected_genres}>
                            {gameProps.genres.map((genre) => {
                                <p>{genre.name}</p>
                            })} 
                        </div>

                    <div className={style.dropdown}>

                        

                        <button className={style.dropbtn}>Botón Desplegable</button>

                        <div className={style.dropdown_content}>
                            {genres.map((genre) => {
                                return(
                                    <button className={style.genre_button} value={genre.id} name= "genres" onClick={handleGenres}>{genre.name}</button>
                                )
                            })}

                        </div>
                    </div>
                </div>
    
            </form>

        </div>

        // Imagen.
        // Descripción.
        // Plataformas.
        // Fecha de lanzamiento.
        // Rating.
        // Posibilidad de seleccionar/agregar varios géneros en simultáneo.
        // Botón para crear el nuevo videojuego.
    )
}