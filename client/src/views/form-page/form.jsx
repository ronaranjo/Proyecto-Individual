import style from "./form.module.css"
import { useState } from "react"
import { validations } from "./validations"
import { useSelector } from "react-redux";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

export const Form = () => {

    const state = useSelector((state) => ({
        genres: state.genres,
        platforms: state.platforms
    }))

    const [gameProps, setGameProps] = useState({
        id: uuidv4(),
        name:undefined,
        image: undefined,
        description: undefined,
        platforms: [],
        release:undefined,
        rating: undefined,
        genres:[]

    })

    const[errors, setErrors] = useState({})

    function handleChange(event){
        const property = event.target.name;
        const value = event.target.value;

        setGameProps({...gameProps, [property]:value})
        validations({...gameProps, [property]:value},errors, setErrors)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGameProps({...gameProps, image: file});
        validations({...gameProps, image: file}, errors, setErrors)
    };

    const handleArray = (event) => {
        event.preventDefault()
        const button = event.target;
        const value = event.target.value
        const name = event.target.name

        if(!gameProps[name].includes(value)){
            setGameProps({...gameProps, [name]: [...gameProps[name], value]})
            validations({...gameProps, [name]: [...gameProps[name], value]}, errors, setErrors)
            button.classList.remove(style.content_button)
            button.classList.add(style.content_button_selected)
        }else{
            button.classList.remove(style.content_button_selected)
            button.classList.add(style.content_button)
            setGameProps({...gameProps, [name]: gameProps[name].filter((g) => g !== value)})
            validations({...gameProps, [name]: gameProps[name].filter((g) => g !== value)}, errors, setErrors)
        }

    }

    async function handleSubmit(event){
        event.preventDefault()
        const formDataToSend = new FormData();
        
        for (const key in gameProps) {
            if (Array.isArray(gameProps[key])) {
              gameProps[key].forEach((item) => formDataToSend.append(key, item));
            } else {
              formDataToSend.append(key, gameProps[key]);
            }
          }

        try {
            const response = await axios.post('http://localhost:3001/videogames', formDataToSend);
            const succes = document.getElementById("succes")
            succes.classList.remove(style.notsucces)      

        } catch (error) {
            console.log(error.message);
        }
        setTimeout(() => {
            window.location.reload();
          }, 4000);
    }

    const handleButton = () => {
        if(Object.keys(errors).length === 0){
            return(
                <p className={style.disabled_btn}>Enviar</p>
            )
        }else{
            for(const key in errors){
                if(errors[key]){
                    return(
                        <p className={style.disabled_btn}>Enviar</p>
                    )
                }
            }
        }
        return(
            <button type="submit" className={style.enabled_btn}>Enviar</button>
        )
    }

    return (
        <div className={style.main_container}>
            <form className={style.form_container} onSubmit={handleSubmit}>

                <div className={style.input_container} >
                    
                    <label className={style.label} htmlFor="name">Name</label>
                    <input className={style.input} type="text" name='name' value={gameProps.name} placeholder="Name" onChange={handleChange}/>
                    <p className={style.error}>{errors.name}</p>
                </div>

                <div className={style.input_container} >
                    <label className={style.label} htmlFor="image">Image</label>
                    <input className={style.img_input} type="file"  name="image" onChange={handleFileChange}/>
                    <p className={style.error}>{errors.image}</p>
                    
                </div>

                <div className={style.input_container} >
                    
                    <label className={style.label} htmlFor="description">Description</label>
                    <input className={style.input} type="text" name='description' value={gameProps.description} placeholder="Description" onChange={handleChange}/>
                    <p className={style.error}>{errors.description}</p>
                </div>

                <div className={style.input_container} >
    
                    <label className={style.label} htmlFor="platforms">Platforms</label>

                    <div className={style.dropdown}>

                        <button className={style.dropbtn}>Select Platforms</button>

                        <div className={style.dropdown_content}>
                            {state.platforms.map((plat) => {
                                return(
                                    <button className={style.content_button} value={plat.id} name= "platforms" onClick={handleArray}>{plat.name}</button>
                                )
                            })}

                        </div>
                    </div>
                    <p className={style.error}>{errors.platforms}</p>
                </div>

                <div className={style.input_container} >
   
                    <label className={style.label} htmlFor="plataforms">Release</label>
                    <input className={style.input} type="text" name='release' value={gameProps.release} placeholder="DD-MM-YYYY" onChange={handleChange}/>
                    <p className={style.error}>{errors.release}</p>
                </div>

                <div className={style.input_container} >
                    
                    <label className={style.label} htmlFor="plataforms">Rating</label>
                    <input className={style.input} type="text" name='rating' value={gameProps.rating} placeholder="0.0" onChange={handleChange}/>
                    <p className={style.error}>{errors.rating}</p>
                </div>

                <div className={style.input_container} >
           
                    <label className={style.label} htmlFor="genres">Genres</label>

                    <div className={style.dropdown}>

                        <button className={style.dropbtn}>Select Genres</button>

                        <div className={style.dropdown_content}>
                            {state.genres.map((genre) => {
                                return(
                                    <button className={style.content_button} value={genre.id} name= "genres" onClick={handleArray}>{genre.name}</button>
                                )
                            })}

                        </div>
                    </div>
                    <p className={style.error}>{errors.genres}</p>
                </div>

                {handleButton()}

                <p id="succes" className={style.notsucces}>Succes! Game Added, Restarting page ...</p>
                
            </form>
        </div>
    )
}