import './App.css';
import{Route, Router, useHistory} from "react-router-dom"
import {Landing} from './views/landing-page/landing'
import { Home } from './views/home-page/home';
import { Form } from './views/form-page/form';
import {NavBar} from "./components/NavBar/navBar"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { getAllGames, getGenres } from './redux/actions';

function App() {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getAllGames())
    dispatch(getGenres())
  })

  return (
    <div className="App">
      <NavBar></NavBar>
      <Router history={useHistory()}>
        <Route exact path='/' component={Landing}></Route>
        <Route path='/home' component={Home}></Route>
        <Route path='/form' component={Form}></Route>
      </Router>
    </div>
  );
}

export default App;
