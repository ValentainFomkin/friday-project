import React, {useEffect} from 'react';
import {useAppSelector} from "../../../../n2-bll/store";
import {PATH} from "../routes/paths-routes/PathRoutes";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN_PATH)
        }
    }, [isLoggedIn])

    return (
        <div>
            DEF PAGE
        </div>
    );
};
