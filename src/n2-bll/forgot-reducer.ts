import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, ForgotType, SetNewPassType} from "../n1-dall/auth-api";


const initialState: InitialStateType = {
    isForgot: false,
    passwordIsReset: false,
    user: {
        email: '',
        password: '',
    }
}

// CONSTANTS
const auth_IS_FORGOT = 'auth/IS_FORGOT'
const SET_USER_EMAIL = 'SET_USER_EMAIL'
const SET_NEW_USER_PASSWORD = 'SET_NEW_USER_PASSWORD'
const SET_RESET_PASSWORD = 'SET_RESET_PASSWORD'


// Reducers
export const forgotReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_FORGOT":
            return {...state, isForgot: action.value}
        case "SET_USER_EMAIL":
            return {
                ...state,
                user: {...state.user, email: action.email}
            }
        case "SET_NEW_USER_PASSWORD":
            return {
                ...state,
                user: {...state.user, password: action.newPassword}
            }
        case "SET_RESET_PASSWORD":
            return {...state, passwordIsReset: action.value}
        default:
            return state
    }
}

// actions
export const isForgotAC = (value: boolean) => ({type: auth_IS_FORGOT, value} as const)
export const setUserEmailAC = (email: string) => ({type: SET_USER_EMAIL, email} as const)
export const setNewUserPasswordAC = (newPassword: string) => ({type: SET_NEW_USER_PASSWORD, newPassword} as const)
export const passwordIsResetAC = (value: boolean) => ({type: SET_RESET_PASSWORD, value} as const)


// thunks
export const setNewUserPasswordTC = (data: SetNewPassType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.setNewPassword(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(passwordIsResetAC(true))

        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppStatusAC('succeeded'))

        })
}


export const isForgotTC = (data: ForgotType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isForgotAC(true))
            dispatch(setUserEmailAC(data.email))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        })
}

// types
type UserType = {
    email: string
    password: string
}
export type InitialStateType = {
    isForgot: boolean
    passwordIsReset: boolean
    user: UserType
}
export type isForgotActionType = ReturnType<typeof isForgotAC>
export type setUserEmailActionType = ReturnType<typeof setUserEmailAC>
export type setNewUserPasswordActionType = ReturnType<typeof setNewUserPasswordAC>
export type passwordIsResetActionType = ReturnType<typeof passwordIsResetAC>
export type ActionType = isForgotActionType
    | setUserEmailActionType
    | setNewUserPasswordActionType
    | passwordIsResetActionType

