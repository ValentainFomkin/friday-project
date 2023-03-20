import React, {useEffect} from 'react';
import './App.module.css';
import {NavBar} from "./u1-fetures/components/f7-navigation/NavBar";
import s from './App.module.css'
import {RoutesComponent} from "./u1-fetures/components/routes/Routes";
import {BrowserRouter, Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../n2-bll/store";
import {ErrorSnackbar} from "./u1-fetures/components/errors/ErrorSnackBar";
import {RequestStatusType, setInitializedTC} from "../n2-bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {isLogOutTC} from "../n2-bll/login-reducer";
import {PATH} from "./u1-fetures/components/routes/paths-routes/PathRoutes";


function App() {
    const isInitialized = useAppSelector<boolean>(s => s.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const status = useAppSelector<RequestStatusType>(s => s.app.status)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setInitializedTC())
    }, [])


    const logOutHandler = () => {
        dispatch(isLogOutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className={s.App}>
                <ErrorSnackbar/>
                <AppBar className={s.appBar} position="static">
                    <Toolbar className={s.toolBar}>
                        <Typography variant="h4">
                            <Link className={s.linkHomePage} to={PATH.HOME_PAGE_PATH}>INTRO</Link>
                        </Typography>
                        {isLoggedIn &&
                            <Button onClick={logOutHandler} color="inherit">
                                Log out
                            </Button>
                        }
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                {!isLoggedIn && <NavBar/>}
                <RoutesComponent/>

            </div>
        </BrowserRouter>

    );
}

export default App;
