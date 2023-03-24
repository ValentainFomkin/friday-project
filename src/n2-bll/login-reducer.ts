import {authAPI, LoginParamsType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC, setInitializedAC} from "./app-reducer";
import {AxiosError} from "axios";
import {isRegisterAC} from "./register-reducer";
import {isForgotAC} from "./forgot-reducer";


const initialState: InitialStateType = {
    isLoggedIn: false,
    user: {
        userName: '',
        nickName: '',
    }
}

// CONSTANTS
const auth_IS_LOGGED = 'auth/IS_LOGGED'
const auth_SET_NEW_NICK_NAME = 'auth/SET_NEW_NICK_NAME'
const auth_SET_NAME = 'auth/SET_NAME'

// const SET_USER_EMAIL = 'SET_USER_EMAIL'

// Reducers
export const loginReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_LOGGED":
            return {...state, isLoggedIn: action.value}
        case "auth/SET_NEW_NICK_NAME":
            return {...state, user: {...state.user, nickName: action.newNIckNAme}}
        case "auth/SET_NAME":
            return {...state, user: {...state.user, userName: action.name}}
        default:
            return state
    }
}

// actions
export const isLoggedInAC = (value: boolean) => ({type: auth_IS_LOGGED, value} as const)
export const setNewNickNamedAC = (newNIckNAme: string) => ({type: auth_SET_NEW_NICK_NAME, newNIckNAme} as const)
export const setNameAC = (name: string) => ({type: auth_SET_NAME, name} as const)


// thunks
export const isLoggedInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isLoggedInAC(true))
            dispatch(isRegisterAC(true))
            dispatch(setInitializedAC(true))
            dispatch(setNameAC(data.email))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))

        })
}
export const isLogOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isLoggedInAC(false))
            dispatch(isForgotAC(false))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC('failed'))

        })
}

// types
export type UserLoginType = {
    userName: string
    nickName: string

}
export type InitialStateType = {
    isLoggedIn: boolean
    user: UserLoginType

}
export type isLoggedInActionType = ReturnType<typeof isLoggedInAC>
export type setNewNickNamedActionType = ReturnType<typeof setNewNickNamedAC>
export type setNamedActionType = ReturnType<typeof setNameAC>

export type ActionType = isLoggedInActionType | setNewNickNamedActionType | setNamedActionType
