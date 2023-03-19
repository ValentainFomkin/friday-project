import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, ForgotType} from "../n1-dall/auth-api";
import {AxiosError} from "axios";


const initialState: InitialStateType = {
    isForgot: false,
    user: {
        email: '',
        password: '',
    }
}

// CONSTANTS
const auth_IS_FORGOT = 'auth/IS_FORGOT'
const SET_USER_EMAIL = 'SET_USER_EMAIL'

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
        default:
            return state
    }
}

// actions
export const isForgotAC = (value: boolean) => ({type: auth_IS_FORGOT, value} as const)
export const setUserEmailAC = (email: string) => ({type: SET_USER_EMAIL, email} as const)


// thunks

export const isForgotTC = (data: ForgotType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isForgotAC(true))
            dispatch(setUserEmailAC(data.email))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
}

// types
type UserType = {
    email: string
    password: string
}
export type InitialStateType = {
    isForgot: boolean
    user: UserType
}
export type isForgotActionType = ReturnType<typeof isForgotAC>
export type setUserEmailActionType = ReturnType<typeof setUserEmailAC>
export type ActionType = isForgotActionType | setUserEmailActionType
