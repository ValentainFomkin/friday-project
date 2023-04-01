import axios from 'axios'


const instance = axios.create({
  //baseURL: process.env.NODE_ENV === 'development'  ? 'Enter url for local backend' : 'https://neko-back.herokuapp.com/2.0/' ,
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '1829c64f-03ce-4449-b50f-e899459dd9bd'
  }
})

export const tableAPI = {
  getAllPacks() {
    return instance.get<ResponseType>('cards/pack', {
      params: {
        page: 1,
        pageCount: 50
      }
    })
  },
  addNewPack(data: AddNewPackType) {
    return instance.post<CardPacks>('cards/pack', {
      cardsPack: {
        name: data.name
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
}

export type UpdateCardPack = {
  _id: string
  name: string
}

export type PackConfigType = {
  packName?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
  user_id?: string// чьи колоды не обязательно, или придут все
  block?: boolean
}

export type ResponseType = {
  cardPacks: CardPacks[]
  cardPacksTotalCount: number// количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number

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