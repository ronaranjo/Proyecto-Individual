import { useSelector, useDispatch } from "react-redux";
import { searchGames, setGames } from "../../redux/actions";
import { useState } from "react";
import style from "./searchBar.module.css"

export function SearchBar() {

  const state = useSelector((state) => ({
    allGames: state.allGames
  }))

    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleChange = (event)=>{
      setName(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(searchGames(name))
      dispatch(setGames())
      setName("")
      console.log(state.allGames);
    }


      return (
        <div className={style.main_container}>
          <input className={style.input} type="search" onChange={handleChange}/>
          <button className={style.button} onClick={handleSubmit}>Search</button>
        </div>
      );
    }