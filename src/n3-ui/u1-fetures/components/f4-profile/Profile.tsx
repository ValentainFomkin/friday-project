import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {Link, Navigate} from "react-router-dom";
import {PATH} from "../routes/paths-routes/PathRoutes";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import s from "./Profile.module.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import avatar from './../../../images/img-profile/avatar-profile.png'
import {Send} from "@mui/icons-material";
import {changeProfileInfoTC} from "../../../../n2-bll/app-reducer";
import {isLogOutTC} from "../../../../n2-bll/login-reducer";
import {ProfileInfoType} from "../../../../n1-dall/auth-api";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

type FormikProfileErrorType = {
    nickName?: string
    avatar?: string
}
type SetShowType = 'show' | 'unShow'
export const Profile = () => {

    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const actualEmail = useAppSelector<string>(s => s.app.user.email)
    const actualNickName = useAppSelector<string>(s => s.app.user.name)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
    }, [isLoggedIn, actualNickName, actualEmail])


    const [showInfoOfUser, setShowInfoOfUser] = useState<SetShowType>('unShow')
    const showButtonAndInputHandler = () => {
        setShowInfoOfUser('show')
    }
    const unShowButtonAndInputHandler = (values: ProfileInfoType) => {
        dispatch(changeProfileInfoTC(values))
        setShowInfoOfUser('unShow')
    }

    const logOutHandler = () => {
        dispatch(isLogOutTC())
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            avatar: ''
        },
        onSubmit: (values) => {
            unShowButtonAndInputHandler(values)
            // formik.resetForm()
        },
        validate: values => {
            const errors: FormikProfileErrorType = {}
            if (!values.name) {
                errors.nickName = 'Required';
            } else if (values.name.length < 2) {
                errors.nickName = 'Nickname length must be more than 2 characters';
            }
            return errors
        }
    })


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN_PATH}/>
    }


    return (
        <div className={s.profileContainer}>
            <div className={s.backToPackList}>
                <Link className={s.linkBack}
                      to={PATH.HOME_PAGE_PATH}
                >
                    <KeyboardBackspaceIcon className={s.iconBack}/>
                    <div>Back to Packs List</div>
                </Link>
            </div>
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
                                Personal information
                            </Typography>
                            <div className={s.avatar}>
                                <Avatar
                                    alt="Avatar"
                                    src={avatar}
                                    sx={{width: 150, height: 150}}
                                />
                            </div>

                            {showInfoOfUser === 'show' ?
                                <div className={s.nickName}>
                                    <TextField
                                        variant={'standard'}
                                        fullWidth
                                        type="text"
                                        id='name'
                                        label="Nickname"
                                        {...formik.getFieldProps('name')}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className={s.sendButton}>
                                        <Button variant="text"
                                                endIcon={<Send/>}
                                                onClick={() => unShowButtonAndInputHandler(formik.values)}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                : <Typography variant={'h6'}
                                              marginBottom={'40px'}
                                              fontWeight={'600'}
                                              onDoubleClick={showButtonAndInputHandler}
                                >
                                    {actualNickName ? actualNickName : actualEmail}
                                </Typography>
                            }

                            {formik.touched.name
                                ?
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    marginBottom: '10px',
                                    marginTop: '-10px'
                                }}>
                                    {formik.errors.name}
                                </div>
                                : null}

                            <div className={s.actualEmail}>
                                <Typography>
                                    {actualEmail}
                                </Typography>
                            </div>
                            <div className={s.buttonSubmit}>
                                <Button type={'button'}
                                        variant={'outlined'}
                                        color={'inherit'}
                                        onClick={logOutHandler}
                                >
                                    log out
                                </Button>
                            </div>


                        </Paper>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

