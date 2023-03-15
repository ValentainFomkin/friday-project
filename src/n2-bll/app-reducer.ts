import {Dispatch} from "redux";
import {authAPI, RegisterType} from "../n1-dall/auth-api";
import {AxiosError} from "axios";

const initialState: InitialStateType = {
    isRegister: false,
    status: 'idle',
    error: null
}
const auth_IS_REGISTER = 'auth/IS_REGISTER'
const auth_IS_ERROR = 'auth/IS_ERROR'
const auth_IS_CHANGE_STATUS = 'auth/IS_CHANGE_STATUS'

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_REGISTER":
            return {...state, isRegister: action.value}
        case "auth/IS_CHANGE_STATUS":
            return {...state, status: action.status}
        case "auth/IS_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const isRegisterAC = (value: boolean) => ({type: auth_IS_REGISTER, value} as const)
export const setAppErrorAC = (error: string | null) => ({type: auth_IS_ERROR, error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: auth_IS_CHANGE_STATUS, status} as const)


//thunks
export const isRegisterTC = (data: RegisterType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isRegisterAC(true))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    isRegister: boolean
    status: RequestStatusType
    error: string | null
}
export type IsRegisterAC = ReturnType<typeof isRegisterAC>
export type SetAppErrorAC = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export type ActionType =
    IsRegisterAC
    | SetAppErrorAC
    | SetAppStatusAC