import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {PATH} from "../routes/paths-routes/PathRoutes";
import {useNavigate} from "react-router-dom";
import {DataTable} from "./PacksPage/PacksPageTable";

export const MainPage = () => {
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN_PATH)
        }
    }, [isLoggedIn])

    return (
        <div>
            {/*PACK LIST*/}
            {/*<PacksListTable/>*/}
            <DataTable/>
        </div>
    );
};
