const initialState: InitialStateType = {
    status: 'idle',
    error: null,

}
const auth_IS_ERROR = 'auth/IS_ERROR'
const auth_IS_CHANGE_STATUS = 'auth/IS_CHANGE_STATUS'

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "auth/IS_CHANGE_STATUS":
            return {...state, status: action.status}
        case "auth/IS_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: auth_IS_ERROR, error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: auth_IS_CHANGE_STATUS, status} as const)


//thunks


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null

}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type ActionType =
    | SetAppErrorActionType
    | SetAppStatusActionType