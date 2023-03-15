import React from 'react';
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {isRegisterTC} from "../../../../n2-bll/app-reducer";
import {Navigate} from "react-router-dom";

export type FormikErrorType = {
    email?: string
    password?: string
}

export const Registration = () => {
    const isRegister = useAppSelector(s => s.app.isRegister)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be more than 6 characters';
            } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.password)) {
                errors.password = 'Invalid email address';
            }


            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            dispatch(isRegisterTC(values))
            formik.resetForm()
        },

    });

    if (isRegister) {
        return <Navigate to={'/login'}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <label htmlFor="email">Email Address</label>
                            <TextField
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email
                                ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                : null}

                            <label htmlFor="password">Password</label>
                            <TextField
                                id="password"
                                type="password"
                                {...formik.getFieldProps('password')}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password
                                ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                                : null}
                        </FormGroup>

                        <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

