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
        instance.get('cards/pack')
    }


}

//types


export type ResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
// количество колод
    token: string
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string

}