import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import {Link, useNavigate} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input"
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import {isLoggedInTC} from "../../../../n2-bll/login-reducer";
import s from './Login.module.css'
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {PATH} from "../routes/paths-routes/PathRoutes";
import {RequestStatusType} from "../../../../n2-bll/app-reducer";
import CircularProgress from "@mui/material/CircularProgress";

type FormikLoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const navigate = useNavigate()
    const status = useAppSelector<RequestStatusType>(s => s.app.status)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN_PATH)
        }
    }, [isLoggedIn, navigate])

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(isLoggedInTC(values))


        },
        validate: values => {
            const errors: FormikLoginErrorType = {}

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

    if (status === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    if (isLoggedIn) {
        navigate(PATH.HOME_PAGE_PATH)
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <Paper className={s.paper}
                       variant={'outlined'}

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
                        ? <div style={{color: 'red', textAlign: 'left', marginBottom: '10px'}}>
                            {formik.errors.email}
                        </div>
                        : null}

                    <div className={s.password}>
                        <Input
                            placeholder='Password'
                            fullWidth
                            id="password"
                            type={showPassword ? 'text' : "password"}
                            {...formik.getFieldProps('password')}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    {formik.touched.password
                        ?
                        <div style={{color: 'red', textAlign: 'left', marginBottom: '10px'}}>
                            {formik.errors.password}
                        </div>
                        : null}

                    <div className={s.formControlLabel}>
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                    </div>
                    <div className={s.forgotPassword}>
                        <Link to={PATH.PASSWORD_RECOVERY_PATH}>
                            Forgot Password?
                        </Link>
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

