import {authAPI, LoginParamsType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC, setInitializedAC, setNewNamedAC, setUserEmailAC} from "./app-reducer";
import {AxiosError} from "axios";
import {isRegisterAC} from "./register-reducer";
import {isForgotAC} from "./forgot-reducer";


const initialState: InitialStateType = {
    isLoggedIn: false
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
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isLoggedInAC(true))
            dispatch(isRegisterAC(true))
            dispatch(setInitializedAC(true))
            dispatch(setUserEmailAC(res.data.email))
            dispatch(setNewNamedAC(res.data.name))

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

export type InitialStateType = {
    isLoggedIn: boolean
    // user: UserLoginType

}
export type isLoggedInActionType = ReturnType<typeof isLoggedInAC>

export type ActionType = isLoggedInActionType

