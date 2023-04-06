import {instance} from "../n3-ui/u1-fetures/c1-utils/Instance/instance";


export const tableAPI = {
  getAllPacks(page?: number,
              pageCount?: number,
              maxCardsCount?: number,
              minCardsCount?: number,
              packName?: string,
              user_id?: string,
  ) {
    return instance.get<ResponseType>('cards/pack', {
      params: {
        page: page,
        pageCount: pageCount,
        max: maxCardsCount,
        min: minCardsCount,
        packName: packName,
        user_id: user_id,
      }
    })
  },
  addNewPack(data: AddNewPackType) {
    return instance.post<CardPacks>('cards/pack', {
      cardsPack: {
        name: data.name,
        private: data.private
      }
    })
  },
  removePack(packID: string) {
    return instance.delete<CardPacks>('cards/pack', {
      params: {
        id: packID
      }
    })
  },
  updatePack(data: UpdateCardPack) {
    return instance.put<CardPacks>('cards/pack', {
      cardsPack: {
        _id: data._id,
        name: data.name
      }
    })
  }

}

//types
export type AddNewPackType = {
  name: string
  deckCover?: string
  private: boolean
}

export type UpdateCardPack = {
  _id: string
  name: string
}

export type ResponseType = {
  cardPacks: CardPacks[]
  cardPacksTotalCount: number// количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
  packName: string
  user_id: string
}
export type CardPacks = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
  private: boolean
}