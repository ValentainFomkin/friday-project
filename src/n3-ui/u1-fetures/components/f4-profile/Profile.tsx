import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {isLogOutTC} from "../f2-login/login-reducer";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
    }, [])

    const logOutHandler = () => {
        dispatch(isLogOutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <div style={{marginBottom: '10px'}}>
                Profile
            </div>

            {isLoggedIn &&
                <div>
                    <button onClick={logOutHandler}>Log Out</button>
                </div>}
        </div>
    );
};

