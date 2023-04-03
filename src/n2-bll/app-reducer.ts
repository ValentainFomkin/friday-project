import {authAPI, ProfileInfoType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {isLoggedInAC} from "./login-reducer";


const auth_IS_ERROR = 'auth/IS_ERROR'
const auth_IS_CHANGE_STATUS = 'auth/IS_CHANGE_STATUS'
const auth_SET_INITIALIZED = 'auth/SET_INITIALIZED'
const auth_SET_NEW_NICK_NAME = 'auth/SET_NEW_NICK_NAME'
const SET_USER_EMAIL = 'SET_USER_EMAIL'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
  user: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,// количество колод
    created: '',
    updated: '',
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: '',
  },
}


export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "auth/IS_CHANGE_STATUS":
      return {...state, status: action.status}
    case "auth/IS_ERROR":
      return {...state, error: action.error}
    case "auth/SET_INITIALIZED":
      return {...state, isInitialized: action.isInitialized}
    case "SET_USER_EMAIL":
      return {...state, user: {...state.user, email: action.email}}
    case "auth/SET_NEW_NICK_NAME":
      return {...state, user: {...state.user, name: action.newName}}

    default:
      return state
  }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: auth_IS_ERROR, error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({
  type: auth_IS_CHANGE_STATUS,
  status
} as const)
export const setInitializedAC = (isInitialized: boolean) => ({
  type: auth_SET_INITIALIZED,
  isInitialized
} as const)
export const setUserEmailAC = (email: string) => ({type: SET_USER_EMAIL, email} as const)
export const setNewNamedAC = (newName: string) => ({type: auth_SET_NEW_NICK_NAME, newName} as const)


//thunks
export const changeProfileInfoTC = (data: ProfileInfoType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.changeProfileInfo(data)
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setNewNamedAC(res.data.updatedUser.name))
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('failed'))
    })

}
export const setInitializedTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.me()
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(isLoggedInAC(true))
      dispatch(setNewNamedAC(res.data.name))
      dispatch(setUserEmailAC(res.data.email))
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      // dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('failed'))
    })
    .finally(() => {
      dispatch(setInitializedAC(true))
    })
}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type UserAppType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error: string
}
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
  user: UserAppType
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACActionType = ReturnType<typeof setInitializedAC>
export type setUserEmailActionType = ReturnType<typeof setUserEmailAC>
export type setNewNickNamedActionType = ReturnType<typeof setNewNamedAC>

// export type setNewUserPasswordActionType = ReturnType<typeof setNewUserPasswordAC>

export type ActionType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetInitializedACActionType
  | setUserEmailActionType
  | setNewNickNamedActionType