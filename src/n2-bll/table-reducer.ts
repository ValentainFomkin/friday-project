import {AnyAction, Dispatch} from "redux";
import {
  AddNewPackType,
  CardPacks,
  ResponseType,
  tableAPI,
  UpdateCardPack
} from "../n1-dall/table-api";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";


const GET_ALL_CARD_PACKS = 'GET_ALL_CARD_PACKS'
const ADD_NEW_PACK = 'ADD_NEW_PACK'
const REMOVE_PACK = 'REMOVE_PACK'
const UPDATE_PACK = 'UPDATE_PACK'
const CHANGE_STATUS_PACK = 'CHANGE_STATUS_PACK'
const CARD_PACK_TOTAL_COUNT = 'CARD_PACK_TOTAL_COUNT'
const MAX_CARD_COUNT = 'MAX_CARD_COUNT'
const MIN_CARD_COUNT = 'MIN_CARD_COUNT'
const SELECTED_PAGE = 'SELECTED_PAGE'
const PAGE_COUNT = 'PAGE_COUNT'
const SEARCH = 'SEARCH'
const USER_ID = 'USER_ID'

const initialState: InitialStateType = {
  statusForTable: 'idle',
  errorForTable: null,
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
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 1,// выбранная страница
    pageCount: 5,
    searchValue: '',
    user_id: ''
  }

}


export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "GET_ALL_CARD_PACKS":
      return {
        ...state,
        cards: {
          ...state.cards,
          cardPacksTotalCount: action.config.cardPacksTotalCount,
          cardPacks: action.config.cardPacks,
        }
      }
    case "ADD_NEW_PACK": {
      return {
        ...state,
        cards: {
          ...state.cards,
          cardPacks: [{
            ...action.newCard,
            name: action.newCard.name,
            private: action.newCard.private
          }, ...state.cards.cardPacks]
        }
      }
    }
    case "REMOVE_PACK":
      return {
        ...state,
        cards: {
          ...state.cards,
          cardPacks: [...state.cards.cardPacks].filter(pack => pack._id !== action.packID)
        }
      }
    case "UPDATE_PACK":
      return {
        ...state,
        cards: {
          ...state.cards,
          cardPacks: [...state.cards.cardPacks].map(pack => pack._id === action.packID ? {
            ...pack,
            name: action.newName
          } : pack)
        }
      }
    case "CHANGE_STATUS_PACK":
      return {...state, statusForTable: action.status}
    case "MAX_CARD_COUNT":
      return {
        ...state,
        cards: {
          ...state.cards,
          minCardsCount: action.minCardsCount,
          maxCardsCount: action.maxCardsCount
        }
      }
    case "SELECTED_PAGE":
      return {...state, cards: {...state.cards, page: action.page}}
    case "PAGE_COUNT":
      return {...state, cards: {...state.cards, pageCount: action.pageCount}}
    case "SEARCH":
      return {...state, cards: {...state.cards, searchValue: action.searchValue}}
    case "USER_ID":
      return {...state, cards: {...state.cards, user_id: action.user_id}}
    default:
      return state
  }
}

//actions
export const setAllCardPacksAC = (config: ResponseType) => ({
  type: GET_ALL_CARD_PACKS,
  config
} as const)
export const addNewPackAC = (newCard: CardPacks) => ({
  type: ADD_NEW_PACK,
  newCard
} as const)
export const removePackAC = (packID: string) => ({type: REMOVE_PACK, packID} as const)
export const updatePackAC = (packID: string, newName: string) => ({
  type: UPDATE_PACK,
  newName,
  packID
} as const)
export const setTableStatusAC = (status: TableStatusType) => ({
  type: CHANGE_STATUS_PACK,
  status
} as const)
export const minMaxCardsCountAC = (minCardsCount: number, maxCardsCount: number) => ({
  type: MAX_CARD_COUNT,
  maxCardsCount,
  minCardsCount
} as const)
export const pageAC = (page: number) => ({
  type: SELECTED_PAGE,
  page
} as const)
export const pageCountAC = (pageCount: number) => ({
  type: PAGE_COUNT,
  pageCount
} as const)
export const searchValueAC = (searchValue: string) => ({
  type: SEARCH,
  searchValue
} as const)
export const userIdAC = (user_id: string) => ({
  type: USER_ID,
  user_id
} as const)


//thunks
export const fetchCardPacksTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const {
    page,
    pageCount,
    maxCardsCount,
    minCardsCount,
    searchValue,
    user_id,
  } = getState().table.cards
  // console.log(minCardsCount, 'thunk creator')
  dispatch(setAppStatusAC('loading'))
  tableAPI.getAllPacks(
    page,
    pageCount,
    maxCardsCount,
    minCardsCount,
    searchValue,
    user_id)
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setAllCardPacksAC(res.data))
      // console.log(res.data, 'res data')
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('failed'))
    })
}
export const addNewPackTC = (data: AddNewPackType) => (dispatch: Dispatch<AnyAction | any>, getState: () => AppRootStateType) => {
  dispatch(setTableStatusAC('loading add button'))
  tableAPI.addNewPack(data)
    .then(res => {
      dispatch(addNewPackAC(res.data))
      dispatch(fetchCardPacksTC())
      setTimeout(() => {
        dispatch(setTableStatusAC('add'))
        console.log('hello')
      }, 2000)
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      dispatch(setAppErrorAC(error))
      dispatch(setTableStatusAC('failed'))
    })

}
export const removePackTC = (packID: string) => (dispatch: Dispatch<AnyAction | any>) => {
  dispatch(setTableStatusAC('loading remove button'))
  tableAPI.removePack(packID)
    .then(res => {
      dispatch(removePackAC(res.data._id))
      dispatch(fetchCardPacksTC())
      setTimeout(() => {
        dispatch(setTableStatusAC('remove'))
        console.log('remove')
      }, 2000)

    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      dispatch(setAppErrorAC(error))
      dispatch(setTableStatusAC('failed'))
    })

}
export const updatePackTC = (data: UpdateCardPack) => (dispatch: Dispatch<AnyAction | any>) => {
  dispatch(setTableStatusAC('loading update button'))
  tableAPI.updatePack(data)
    .then(res => {
      dispatch(setTableStatusAC('update'))
      dispatch(updatePackAC(res.data._id, res.data.name))
      dispatch(fetchCardPacksTC())
    })
    .catch((err) => {
      const error = err.response
        ? err.response.data.error
        : (err.message + ', more details in the console')
      dispatch(setAppErrorAC(error))
      dispatch(setTableStatusAC('failed'))
    })

}


//types
export type TableStatusType =
  'remove'
  | 'update'
  | 'learn'
  | 'add'
  | 'failed'
  | 'idle'
  | 'loading remove button'
  | 'loading update button'
  | 'loading learn button'
  | 'loading add button'
export type InitialStateType = {
  statusForTable: TableStatusType
  errorForTable: string | null
  cards: {
    cardPacks: CardPacks[]
    cardPacksTotalCount: number// количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    searchValue: string
    user_id: string
  }

}

export type setAllCardPacksActionType = ReturnType<typeof setAllCardPacksAC>
export type addNewPackActionType = ReturnType<typeof addNewPackAC>
export type removePackActionType = ReturnType<typeof removePackAC>
export type updatePackActionType = ReturnType<typeof updatePackAC>
export type setTableStatusActionType = ReturnType<typeof setTableStatusAC>
export type minMaxCardsCountActionType = ReturnType<typeof minMaxCardsCountAC>
export type pageActionType = ReturnType<typeof pageAC>
export type pageCountActionType = ReturnType<typeof pageCountAC>
export type searchValueActionType = ReturnType<typeof searchValueAC>
export type userIdActionType = ReturnType<typeof userIdAC>


export type ActionType =
  | setAllCardPacksActionType
  | addNewPackActionType
  | removePackActionType
  | updatePackActionType
  | setTableStatusActionType
  | minMaxCardsCountActionType
  | pageActionType
  | pageCountActionType
  | searchValueActionType
  | userIdActionType