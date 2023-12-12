import style from "./searchBar.module.css"

export function SearchBar(props) {

    // const [name, setName] = useState("")
    
    // const handleChange = (event)=>{
    //   setId(event.target.value)
    // }
  
    // const handleSubmit = () => {
    //   onSearch(name)
    //   setName("")
    // }
  
    // const {onSearch} = props
  
      return (
        <div className={style.main_container}>
          <input className={style.input} type="search" onChange={""}/>
          <button className={style.button} onClick={"handleSubmit"}>Agregar</button>
        </div>
      );
    }