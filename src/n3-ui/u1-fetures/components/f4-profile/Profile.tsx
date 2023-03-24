import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../n2-bll/store";
import {Navigate} from "react-router-dom";
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

type FormikProfileErrorType = {
    nickName?: string
    avatar?: string
}
type SetShowType = 'show' | 'unShow'
export const Profile = () => {
    const isLoggedIn = useAppSelector<boolean>(s => s.login.isLoggedIn)
    const actualEmail = useAppSelector<string>(s => s.forgot.user.email)
    const actualNickName = useAppSelector<string>(s => s.login.user.nickName)
    const name = useAppSelector<string>(s => s.login.user.userName)

    const [showInfoOfUser, setShowInfoOfUser] = useState<SetShowType>('unShow')
    const showButtonAndInputHandler = () => {
        setShowInfoOfUser('show')
    }
    const unShowButtonAndInputHandler = () => {
        setShowInfoOfUser('unShow')

    }

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            nickName: '',
            avatar: ''
        },
        onSubmit: ({nickName, avatar}) => {
            if (!nickName) return
            dispatch(changeProfileInfoTC({name: nickName, avatar}))
            formik.resetForm()
        },
        validate: values => {
            const errors: FormikProfileErrorType = {}
            if (!values.nickName) {
                errors.nickName = 'Required';
            } else if (values.nickName.length < 6) {
                errors.nickName = 'Nickname length must be more than 6 characters';
            }
            return errors
        }
    })

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
    }, [])


    if (!isLoggedIn) {
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
                                    id='nickName'
                                    label="Nickname"
                                    {...formik.getFieldProps('nickName')}
                                    onBlur={formik.handleBlur}

                                />
                                <div className={s.sendButton}>
                                    <Button variant="text"
                                            endIcon={<Send/>}
                                            onClick={unShowButtonAndInputHandler}
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
                                {actualNickName ? actualNickName : name}
                            </Typography>
                        }

                        {formik.touched.nickName
                            ?
                            <div style={{
                                color: 'red',
                                textAlign: 'left',
                                marginBottom: '10px',
                                marginTop: '-10px'
                            }}>
                                {formik.errors.nickName}
                            </div>
                            : null}
                      
                        <div className={s.questionAboutPass}>
                            <Typography>
                                <span className={s.actualEmail}>
                                    {actualEmail}
                                </span>
                            </Typography>
                        </div>
                        <div className={s.buttonSubmit}>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    fullWidth

                            >
                                log out
                            </Button>
                        </div>


                    </Paper>
                </form>
            </Grid>
        </Grid>
    );
};

