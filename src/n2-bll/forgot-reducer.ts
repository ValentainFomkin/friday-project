import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {authAPI, ForgotType} from "../n1-dall/auth-api";
import {AxiosError} from "axios";


const initialState: InitialStateType = {
    isForgot: false,
}

// CONSTANTS
const auth_IS_FORGOT = 'auth/IS_FORGOT'

// Reducers
export const forgotReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_FORGOT":
            return {...state, isForgot: action.value}
        default:
            return state
    }
}

// actions
export const isForgotAC = (value: boolean) => ({type: auth_IS_FORGOT, value} as const)


// thunks

export const isForgotTC = (data: ForgotType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.forgot(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(isForgotAC(true))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppErrorAC(err.message))
        })
}

// types
export type InitialStateType = {
    isForgot: boolean

}
export type isForgotActionType = ReturnType<typeof isForgotAC>
export type ActionType = isForgotActionType
