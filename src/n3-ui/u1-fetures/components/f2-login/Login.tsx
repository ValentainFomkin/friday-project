import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import {Navigate} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import {Checkbox, FormControlLabel, FormLabel} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {isLoggedInTC} from "./login-reducer";

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
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField type="email"
                                   label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                                   onBlur={formik.handleBlur}
                        />
                        {formik.touched.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null}

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              {...formik.getFieldProps('rememberMe')}
                                              // onChange={formik.handleChange}
                                              // checked={formik.values.rememberMe}
                                              // name='rememberMe'
                                          />}
                        />
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                        >
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

