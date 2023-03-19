import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../../../n2-bll/store";
import s from './CheckEmail.module.css'
import {Link} from "react-router-dom";
import {PATH} from "../../routes/paths-routes/PathRoutes";


export const CheckEmail = () => {
    const dispatch = useAppDispatch()
    const actualEmail = useAppSelector<string>(s => s.forgot.user.email)

    const formik = useFormik({
        initialValues: {
            email: '',
            message: `<h1>Перейдите по ссылке для восстановления пароля: <a href='https://ValentainFomkin.github.io/friday-project/set-new-password/$token$'>link</a></h1>`,
        },
        onSubmit: values => {
            // dispatch(isLoggedInTC(values))


        },
    })
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper className={s.paper}
                           variant={'outlined'}

                    >
                        <Typography component={'h2'}
                                    variant={'h4'}
                                    marginBottom={'40px'}
                                    fontWeight={'600'}
                        >
                            Check Email
                        </Typography>
                        <div className={s.image}>
                            <img src="https://cdn-icons-png.flaticon.com/512/552/552486.png"/>
                        </div>

                        <div className={s.typographyHaveAcc}>
                            <Typography>
                                We've sent an Email with instructions to
                                <div className={s.actualEmail}>
                                    {actualEmail}
                                </div>
                            </Typography>
                        </div>
                        <div className={s.buttonLink}>
                            <Link to={PATH.LOGIN_PATH}>
                                BACK TO LOGIN
                            </Link>
                        </div>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
};

