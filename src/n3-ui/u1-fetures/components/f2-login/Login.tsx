import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import {Link, Navigate} from "react-router-dom";
import {Checkbox, FormControlLabel, Paper, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {isLoggedInTC} from "../../../../n2-bll/login-reducer";
import s from './Login.module.css'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(isLoggedInTC(values))

            formik.resetForm()
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Must be more than 6 characters';
            } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.password)) {
                errors.password = 'Invalid password';
            }
            return errors;
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <Paper className={s.paper}
                       variant={'outlined'}
                       square
                >
                    <Typography component={'h2'}
                                variant={'h4'}
                                marginBottom={'25px'}
                                fontWeight={'600'}
                    >
                        Sign in
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
                        ? <div style={{color: 'red', textAlign: 'left', marginTop: '5px'}}>{formik.errors.email}</div>
                        : null}

                    <div className={s.password}>
                        <TextField
                            variant={'standard'}
                            fullWidth
                            type="password"
                            label="Password"
                            {...formik.getFieldProps('password')}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.password
                        ?
                        <div style={{color: 'red', textAlign: 'left', marginTop: '5px'}}>{formik.errors.password}</div>
                        : null}

                    <div className={s.formControlLabel}>
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                    </div>
                    <div className={s.forgotPassword}>
                        Forgot Password?
                    </div>
                    <div className={s.buttonSubmit}>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                fullWidth
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className={s.typographyHaveAcc}>
                        <Typography>
                            Already have an account?
                        </Typography>
                    </div>
                    <div className={s.singUp}>
                        <Link
                            to={'/login'}>
                            Sing Up
                        </Link>
                    </div>
                </Paper>
            </form>
        </Grid>
    </Grid>
}

