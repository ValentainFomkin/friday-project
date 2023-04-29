import {instance} from "n3-ui/u1-fetures/c1-utils/Instance/instance";


export const packsAPI = {

   getAllCards(params: SearchParamsType) {
      return instance.get<ResponseTypePacks>('cards/card', {
         params: {
            // ...params
            // cardAnswer: params.cardAnswer,
            // cardQuestion: params.cardQuestion,
            cardsPack_id: params.cardsPack_id,
            // min: params.min,
            // max: params.max,
            // sortCards: params.sortCards,
            page: params.page,
            pageCount: params.pageCount,
         }
      })
   },

}

//types


export type ResponseTypePacks = {
   cards: CardType[]
   cardsTotalCount: number
   maxGrade: number
   minGrade: number
   page: number
   pageCount: number
   packUserId: string
}
export type CardType = {
   answer: string
   question: string
   cardsPack_id: string
   grade: number
   shots: number
   user_id: string
   created: string
   updated: string
   _id: string
}
export type SearchParamsType = {
   cardAnswer: string | null
   cardQuestion: string | null
   cardsPack_id: string | null
   min: number | null
   max: number | null
   sortCards: number | null
   page: number | null
   pageCount: number | null
   cardsTotalCount: number | null
   _id: string | null
}