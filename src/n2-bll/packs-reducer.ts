import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {CardType, packsAPI, ResponseTypePacks, SearchParamsType} from "../n1-dall/packs-api";


const GET_ALL_CARDS = 'GET_ALL_CARDS'
const SELECTED_PAGE_CARD = 'SELECTED_PAGE_CARD'
const CARDS_PACK_ID = 'CARDS_PACK_ID'
const PACK_PAGE_COUNT = 'PACK_PAGE_COUNT'


const initialState: InitialStateType = {
   cards: [],
   searchParams: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: null as number | null,
      max: null as number | null,
      sortCards: null as number | null,
      page: null as number | null,
      pageCount: null as number | null,
      cardsTotalCount: null as number | null,
      _id: '',
   }
}


export const packsReducer = (state = initialState, action: ActionPacksType): InitialStateType => {
   switch (action.type) {
      case "GET_ALL_CARDS":
         return {
            ...state, cards: action.params.cards,
            searchParams: {
               ...state.searchParams,
               cardsTotalCount: action.params.cardsTotalCount,
               pageCount: action.params.pageCount,
               // page: action.params.page
            }
         }
      case "SELECTED_PAGE_CARD":
         return {
            ...state, searchParams: {...state.searchParams, page: action.page}
         }
      case "CARDS_PACK_ID":
         return {
            ...state,
            searchParams: {
               ...state.searchParams, cardsPack_id: action.iD
            }
         }
      case "PACK_PAGE_COUNT":
         return {
            ...state,
            searchParams: {...state.searchParams, pageCount: action.pageCount}
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
export const cardsPackIdAC = (iD: string) => ({
   type: CARDS_PACK_ID,
   iD
} as const)
export const packPageCountAC = (pageCount: number) => ({
   type: PACK_PAGE_COUNT,
   pageCount
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
export type CardsPackId = ReturnType<typeof cardsPackIdAC>
export type PackPageCountAC = ReturnType<typeof packPageCountAC>


export type ActionPacksType = GetAllCards
   | PageCard
   | CardsPackId
   | PackPageCountAC