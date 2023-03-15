import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/'
    withCredentials: true,
    headers: {
        'API-KEY': '1829c64f-03ce-4449-b50f-e899459dd9bd'
    }
})

export const authAPI = {
    register(data: RegisterType) {
        return instance.post<ResponseType>('auth/register', data)
    }
}

//types
export type RegisterType = {
    email: string
    password: string
}

export type ResponseType = {
    error?: string
}