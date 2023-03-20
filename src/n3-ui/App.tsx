import React, {useEffect} from 'react';
import './App.module.css';
import {NavBar} from "./u1-fetures/components/f7-navigation/NavBar";
import s from './App.module.css'
import {RoutesComponent} from "./u1-fetures/components/routes/Routes";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../n2-bll/store";
import {ErrorSnackbar} from "./u1-fetures/components/errors/ErrorSnackBar";
import {setInitializedTC} from "../n2-bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";


function App() {
    const isInitialized = useAppSelector<boolean>(s => s.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setInitializedTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className={s.App}>
            <ErrorSnackbar/>
            <BrowserRouter>
                <NavBar/>
                <RoutesComponent/>
            </BrowserRouter>

        </div>
    );
}

export default App;
