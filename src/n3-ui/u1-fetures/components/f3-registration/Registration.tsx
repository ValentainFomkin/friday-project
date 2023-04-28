import React, {useState} from 'react';
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {Link, Navigate} from "react-router-dom";
import {isRegisterTC} from "../../../../n2-bll/register-reducer";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input"
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import s from './Register.module.css'
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {PATH} from "../routes/paths-routes/PathRoutes";


type FormikRegistrationErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const Registration = () => {
  const isRegister = useAppSelector<boolean>(s => s.register.isRegister)
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikRegistrationErrorType = {};
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
        errors.password = 'Invalid password';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'The confirmation password must match the main password';
      } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.password)) {
        errors.confirmPassword = 'Invalid password';
      }


      return errors;
    },
    onSubmit: values => {
      dispatch(isRegisterTC(values))
      formik.resetForm()
    },

  });

  if (isRegister) {
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
                        marginBottom={'25px'}
                        fontWeight={'600'}
            >
              Sign up
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
              ? <div
                style={{
                  color: 'red',
                  textAlign: 'left',
                  marginBottom: '5px',
                  marginTop: '-10px'
                }}>{formik.errors.email}</div>
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
              ? <div style={{
                color: 'red',
                textAlign: 'left',
                marginBottom: '5px',
                marginTop: '-10px'
              }}>{formik.errors.password}</div>
              : null}
            <div className={s.confirmPassword}>
              <Input
                placeholder='Confirm Password'
                fullWidth
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...formik.getFieldProps('confirmPassword')}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position={"end"}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            {formik.touched.confirmPassword
              ? <div style={{
                color: 'red',
                textAlign: 'left',
                marginBottom: '50px',
                marginTop: '-50px'
              }}>{formik.errors.confirmPassword}</div>
              : null}

            <div className={s.buttonSubmit}>
              <Button
                fullWidth
                variant={'contained'}
                type="submit">
                Sing up
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
                Sing in
              </Link>
            </div>
          </Paper>

        </form>
      </Grid>
    </Grid>
  );
};

