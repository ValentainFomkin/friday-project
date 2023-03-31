import React, {useEffect, useState} from 'react';
import './App.module.css';
import {NavBar} from "./u1-fetures/components/f7-navigation/NavBar";
import s from './App.module.css'
import {RoutesComponent} from "./u1-fetures/components/routes/Routes";
import {HashRouter, Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../n2-bll/store";
import {ErrorSnackbar} from "./u1-fetures/components/errors/ErrorSnackBar";
import {RequestStatusType, setInitializedTC} from "../n2-bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import {isLogOutTC} from "../n2-bll/login-reducer";
import {PATH} from "./u1-fetures/components/routes/paths-routes/PathRoutes";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import avatar from './images/img-profile/avatar-profile.png'
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


export const App = () => {
    const isInitialized = useAppSelector<boolean>(s => s.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const status = useAppSelector<RequestStatusType>(s => s.app.status)
    const actualNickName = useAppSelector<string>(s => s.app.user.name)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        dispatch(setInitializedTC())
    }, [])


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogOut = () => {
        dispatch(isLogOutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <HashRouter>
            <div className={s.App}>
                <ErrorSnackbar/>
                <AppBar className={s.appBar} position="static">
                    <Toolbar className={s.toolBar}>
                        <Typography variant="h4">
                            <Link className={s.linkHomePage} to={PATH.HOME_PAGE_PATH}>INTRO</Link>
                        </Typography>
                        {isLoggedIn &&
                            <div className={s.profile}>
                                <div className={s.profileName}>
                                    <Link to={PATH.PROFILE_PATH}>
                                        {actualNickName}
                                    </Link>
                                </div>
                                <div className={s.profileImage}>
                                    <IconButton
                                        size="small"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar src={avatar}/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}
                                                  className={s.linkToProfile}>
                                            <Link to={PATH.PROFILE_PATH}>
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogOut}
                                        >
                                            Log out
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        }
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                {!isLoggedIn && <NavBar/>}
                <RoutesComponent/>

            </div>
        </HashRouter>

    );
}

