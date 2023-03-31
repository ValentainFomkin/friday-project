import {authAPI, ProfileInfoType} from "../n1-dall/auth-api";
import {Dispatch} from "redux";
import {isLoggedInAC} from "./login-reducer";
import {AddNewPackType, CardPacks, ResponseType, tableAPI} from "../n1-dall/table-api";
import {v1} from "uuid";

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
    cards: {
        cardPacks: [
            {
                _id: "",
                user_id: "",
                user_name: '',
                name: "",
                cardsCount: 0,
                created: "",
                updated: "",
                private: false
            }
        ],
        cardPacksTotalCount: 0,   // количество колод
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,// выбранная страница
        pageCount: 5,
    }

}
const auth_IS_ERROR = 'auth/IS_ERROR'
const auth_IS_CHANGE_STATUS = 'auth/IS_CHANGE_STATUS'
const auth_SET_INITIALIZED = 'auth/SET_INITIALIZED'
const auth_SET_NEW_NICK_NAME = 'auth/SET_NEW_NICK_NAME'
const SET_USER_EMAIL = 'SET_USER_EMAIL'
const GET_ALL_CARD_PACKS = 'GET_ALL_CARD_PACKS'
const ADD_NEW_PACK = 'ADD_NEW_PACK'

// const SET_NEW_USER_PASSWORD = 'SET_NEW_USER_PASSWORD'

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
        case "GET_ALL_CARD_PACKS":
            return {
                ...state,
                cards: {
                    ...state.cards,
                    cardPacks: action.config.cardPacks.map(p => ({...p})),
                    cardPacksTotalCount: action.config.cardPacksTotalCount,
                    maxCardsCount: action.config.maxCardsCount,
                    minCardsCount: action.config.minCardsCount,
                    page: action.config.page,
                    pageCount: action.config.pageCount,
                },
            }
        case "ADD_NEW_PACK": {
            const newCard: CardPacks = {
                _id: v1(),
                user_id: action.newCard.user_id,
                user_name: action.newCard.user_name,
                name: action.newCard.name,
                cardsCount: action.newCard.cardsCount,
                created: action.newCard.created,
                updated: action.newCard.updated,
                private: action.newCard.private,
            }
            return {
                ...state,
                cards: {
                    ...state.cards,
                    cardPacks: [newCard, ...state.cards.cardPacks]
                }
            }
        }
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: auth_IS_ERROR, error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: auth_IS_CHANGE_STATUS, status} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: auth_SET_INITIALIZED, isInitialized} as const)
export const setUserEmailAC = (email: string) => ({type: SET_USER_EMAIL, email} as const)
export const setNewNamedAC = (newName: string) => ({type: auth_SET_NEW_NICK_NAME, newName} as const)
export const setAllCardPacksAC = (config: ResponseType) => ({type: GET_ALL_CARD_PACKS, config} as const)
export const addNewPackAC = (newCard: CardPacks) => ({type: ADD_NEW_PACK, newCard} as const)

// export const setNewUserPasswordAC = (newPassword: string) => ({type: SET_NEW_USER_PASSWORD, newPassword} as const)


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
export const fetchCardPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tableAPI.getAllPacks()
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAllCardPacksAC(res.data))

        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

export const addNewPackTC = (data: AddNewPackType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tableAPI.addNewPack(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addNewPackAC(res.data))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
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
    cards: {
        cardPacks: CardPacks[]
        cardPacksTotalCount: number// количество колод
        maxCardsCount: number
        minCardsCount: number
        page: number // выбранная страница
        pageCount: number
    }

}
export type InfoOfCards = {
    cardPTC: number
    maxCC: number
    minCC: number
    page: number
    pageCount: number
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACActionType = ReturnType<typeof setInitializedAC>
export type setUserEmailActionType = ReturnType<typeof setUserEmailAC>
export type setNewNickNamedActionType = ReturnType<typeof setNewNamedAC>
export type setAllCardPacksActionType = ReturnType<typeof setAllCardPacksAC>
export type addNewPackActionType = ReturnType<typeof addNewPackAC>

// export type setNewUserPasswordActionType = ReturnType<typeof setNewUserPasswordAC>

export type ActionType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedACActionType
    | setUserEmailActionType
    | setNewNickNamedActionType
    | setAllCardPacksActionType
    | addNewPackActionType

// | setNewUserPasswordActionType
