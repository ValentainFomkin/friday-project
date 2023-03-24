import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    //baseURL: process.env.NODE_ENV === 'development'  ? 'Enter url for local backend' : 'https://neko-back.herokuapp.com/2.0/' ,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '1829c64f-03ce-4449-b50f-e899459dd9bd'
    }
})

export const authAPI = {
    register(data: RegisterType) {
        return instance.post<AxiosResponse<{ error?: string }>>('auth/register', data)
    },
    login(data: LoginParamsType) {
        return instance.post<AxiosResponse<ResponseType>>('auth/login', data)
    },
    logOut() {
        return instance.delete<AxiosResponse<LogOutResponseType>>('auth/me')
    },
    forgot(email: ForgotType) {
        const data = {
            email: email.email,
            message: `<h1>Перейдите по ссылке для восстановления пароля: <a href='${window.location.origin}/friday-project/set-new-password/$token$'>link</a></h1>`,
        }
        return axios.post <AxiosResponse<ForgotResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
    },
    me() {
        return instance.post<AxiosResponse<ResponseType>>('auth/me')
    },
    setNewPassword(data: SetNewPassType) {
        return instance.post<AxiosResponse<ForgotResponseType>>('auth/set-new-password', data)
    },
    changeProfileInfo(data: ProfileInfoType) {
        return instance.put<AxiosResponse<UpdateUserResponseType>>('auth/me', data)
    }


}

//types
export type RegisterType = {
    email: string
    password: string
}

export type ProfileInfoType = {
    name: string
    avatar?: string
}

export type SetNewPassType = {
    password?: string
    resetPasswordToken?: string
}

export type ForgotType = {
    email: string
    // from: string
    // message: string
}

export type ForgotResponseType = {
    info: string
    error: string
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

export type UpdateUserResponseType = {
    updateUser: ResponseType
    error?: string
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    token: string
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;

}