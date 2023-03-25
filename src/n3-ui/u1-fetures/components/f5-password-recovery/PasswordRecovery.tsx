import React from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import s from './PassRecovery.module.css'
import Button from "@mui/material/Button";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../routes/paths-routes/PathRoutes";
import {isForgotTC} from "../../../../n2-bll/forgot-reducer";

export enum CorrectHostPath {
    LOCAL_HOST = 'http://localhost:3000/friday-project',
    GITHUB_ENV = 'https://ValentainFomkin.github.io/friday-project'
}

type FormikPassRecoveryErrorType = {
    email?: string
    // from: string
    // message?: string
}
export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    console.log(window.location.hostname)

    const isForgot = useAppSelector<boolean>(s => s.forgot.isForgot)

    const envPath = window.location.hostname === 'localhost' ? CorrectHostPath.LOCAL_HOST : CorrectHostPath.GITHUB_ENV
    const formik = useFormik({
        initialValues: {
            email: '',
            // message: `<h1>Перейдите по ссылке для восстановления пароля: <a href='http://localhost:3000/set-new-password/$token$'>link</a></h1>`,
        },
        onSubmit: values => {
            // dispatch(isLoggedInTC(values))
            dispatch(isForgotTC(values, envPath))
            formik.resetForm()
        },
        validate: values => {

            const errors: FormikPassRecoveryErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        }
    })
    if (isForgot) {
        return <Navigate to={PATH.CHECK_EMAIL_PATH}/>
    }
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
                            Forgot your password?
                        </Typography>
                        <div className={s.email}>
                            <TextField
                                variant={'standard'}
                                fullWidth
                                type="email"
                                label="Email"
                                {...formik.getFieldProps('email')}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email
                            ?
                            <div style={{
                                color: 'red',
                                textAlign: 'left',
                                marginBottom: '10px',
                                marginTop: '-10px'
                            }}>
                                {formik.errors.email}
                            </div>
                            : null}
                        <div className={s.typographyHaveAcc}>
                            <Typography>
                                Enter your email address and we will send you further instructions
                            </Typography>
                        </div>
                        <div className={s.buttonSubmit}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    fullWidth
                            >
                                Send instructions
                            </Button>
                        </div>
                        <div className={s.questionAboutPass}>
                            <Typography>
                                Did you remember your password?
                            </Typography>
                        </div>
                        <div className={s.tryLoggingIn}>
                            <Link to={PATH.LOGIN_PATH}>
                                Try logging in
                            </Link>
                        </div>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
};

