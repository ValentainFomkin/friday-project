import {authAPI, LoginParamsType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {isRegisterAC} from "./register-reducer";


const initialState: InitialStateType = {
    isLoggedIn: false,
}

// CONSTANTS
const auth_IS_LOGGED = 'auth/IS_LOGGED'

// Reducers
export const loginReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_LOGGED":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const isLoggedInAC = (value: boolean) => ({type: auth_IS_LOGGED, value} as const)


// thunks
export const isLoggedInTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            setAppStatusAC('succeeded')
            dispatch(isLoggedInAC(true))
            dispatch(isRegisterAC(true))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
        })
}
export const isLogOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            setAppStatusAC('succeeded')
            dispatch(isLoggedInAC(false))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
}

// types
export type InitialStateType = {
    isLoggedIn: boolean

}
export type isLoggedInActionType = ReturnType<typeof isLoggedInAC>
export type ActionType = isLoggedInActionType
