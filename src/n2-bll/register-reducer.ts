import {authAPI, RegisterType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";


const initialState: InitialStateType = {
    isRegister: false
}

// CONSTANTS
const auth_IS_REGISTER = 'auth/IS_REGISTER'

// Reducers
export const registerReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_REGISTER":
            return {...state, isRegister: action.value}
        default:
            return state
    }
}

// actions
export const isRegisterAC = (value: boolean) => ({type: auth_IS_REGISTER, value} as const)


// thunks
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

// types
export type InitialStateType = {
    isRegister: boolean
}
export type IsRegisterActionType = ReturnType<typeof isRegisterAC>
export type ActionType = IsRegisterActionType
