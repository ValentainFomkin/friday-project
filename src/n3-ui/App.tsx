import React, {useEffect} from 'react';
import './App.module.css';
import {NavBar} from "./u1-fetures/components/f7-navigation/NavBar";
import s from './App.module.css'
import {RoutesComponent} from "./u1-fetures/components/routes/Routes";
import {BrowserRouter} from "react-router-dom";


function App() {
    useEffect(() => {

    }, [])

    return (
        <div className={s.App}>
            <BrowserRouter>
                <NavBar/>
                <RoutesComponent/>
            </BrowserRouter>

        </div>
    );
}

export default App;
