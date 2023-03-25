import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import s from "./EnterNewPass.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {setNewUserPasswordTC} from "../../../../n2-bll/forgot-reducer";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../routes/paths-routes/PathRoutes";


type FormikSetNewPassType = {
    password?: string
    resetPasswordToken?: string
}


export const EnterNewPassword = () => {
    const dispatch = useAppDispatch()
    const param = useParams<{ token: string }>()
   

    const passwordIsReset = useAppSelector<boolean>(s => s.forgot.passwordIsReset)

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)


    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: param.token
        },
        onSubmit: ({password, resetPasswordToken}) => {
            if (!resetPasswordToken) return
            dispatch(setNewUserPasswordTC({password, resetPasswordToken}))

            formik.resetForm()
        },
        validate: values => {
            const errors: FormikSetNewPassType = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Must be more than 6 characters';
            } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.password)) {
                errors.password = 'Invalid password';
            }

            if (!values.resetPasswordToken) {
                errors.resetPasswordToken = 'Token is undefined'
            }
            return errors
        }
    })

    if (passwordIsReset) {
        return <Navigate to={PATH.LOGIN_PATH}/>
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
                            Create new password
                        </Typography>
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
                        <div className={s.passwordChangeInformation}>
                            <Typography>
                                Create new password and we will send you further instructions to email
                            </Typography>
                        </div>
                        <div className={s.buttonSubmit}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    fullWidth
                            >
                                Create new password
                            </Button>
                        </div>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
};

