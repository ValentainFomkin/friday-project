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
        return instance.post<{ error?: string }>('auth/register', data)
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },
    logOut() {
        return instance.delete<LogOutResponseType>('auth/me')
    }
}

//types
export type RegisterType = {
    email: string
    password: string
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LogOutResponseType = {
    info: string
    error: string;
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;

}