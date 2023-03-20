import {authAPI} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {isLoggedInAC} from "./login-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const auth_IS_ERROR = 'auth/IS_ERROR'
const auth_IS_CHANGE_STATUS = 'auth/IS_CHANGE_STATUS'
const auth_SET_INITIALIZED = 'auth/SET_INITIALIZED'

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_CHANGE_STATUS":
            return {...state, status: action.status}
        case "auth/IS_ERROR":
            return {...state, error: action.error}
        case "auth/SET_INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: auth_IS_ERROR, error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: auth_IS_CHANGE_STATUS, status} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: auth_SET_INITIALIZED, isInitialized} as const)


//thunks

export const setInitializedTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isLoggedInAC(true))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))

        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean

}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACActionType = ReturnType<typeof setInitializedAC>
export type ActionType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedACActionType