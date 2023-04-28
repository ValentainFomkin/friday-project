import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {CardType, packsAPI, ResponseTypePacks, SearchParamsType} from "../n1-dall/packs-api";


const GET_ALL_CARDS = 'GET_ALL_CARDS'
const SELECTED_PAGE_CARD = 'SELECTED_PAGE_CARD'


const initialState: InitialStateType = {
   cards: [],
   searchParams: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: 0,
      max: 0,
      sortCards: 0,
      page: 0,
      pageCount: 0,
      cardsTotalCount: 0,
      _id: '',
   }
}


export const packsReducer = (state = initialState, action: ActionType): InitialStateType => {
   switch (action.type) {
      case "GET_ALL_CARDS":
         return {
            ...state, ...action.params
         }
      case "SELECTED_PAGE_CARD":
         return {
            ...state, searchParams: {...state.searchParams, page: action.page}
         }
      default:
         return state
   }
}

//actions
export const getAllCardsAC = (params: ResponseTypePacks) => ({
   type: GET_ALL_CARDS,
   params
} as const)
export const pageCardAC = (page: number) => ({
   type: SELECTED_PAGE_CARD,
   page
} as const)

//thunks
export const fetchCardsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
   dispatch(setAppStatusAC('loading'))
   const state = getState().packs.searchParams
   const params: SearchParamsType = {
      ...state
   }
   packsAPI.getAllCards(params)
      .then(res => {
         dispatch(setAppStatusAC('succeeded'))
         dispatch(getAllCardsAC(res.data))
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
export type TableStatusType =
   'remove'

export type InitialStateType = {
   cards: CardType[],
   searchParams: SearchParamsType
}

export type GetAllCards = ReturnType<typeof getAllCardsAC>
export type PageCard = ReturnType<typeof pageCardAC>


export type ActionType = GetAllCards | PageCard
