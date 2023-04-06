import {
  CorrectHostPath
} from "../n3-ui/u1-fetures/components/f5-password-recovery/PasswordRecovery";
import {instance} from "../n3-ui/u1-fetures/c1-utils/Instance/instance";


export const authAPI = {
  register(data: RegisterType) {
    return instance.post<{ error?: string }>('auth/register', data)
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType>('auth/login', data)
  },
  logOut() {
    return instance.delete<LogOutResponseType>('auth/me')
  },
  forgot(email: ForgotType, envPath: CorrectHostPath) {
    const data = {
      email: email.email,
      from: `test-front-admin <ai73a@yandex.by>`,
      message: `<a href='${envPath}#/set-new-password/$token$'>link</a>`,
    }
    return instance.post<ForgotResponseType>('auth/forgot', {
      email: data.email,
      from: data.from,
      message: data.message
    })
  },
  me() {
    return instance.post<ResponseType>('auth/me')
  },
  setNewPassword(data: SetNewPassType) {
    return instance.post<ForgotResponseType>('auth/set-new-password', data)
  },
  changeProfileInfo(data: ProfileInfoType) {
    return instance.put<UpdateUserResponseType>('auth/me', data)
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
  error: string
}

export type UpdateUserResponseType = {
  updatedUser: ResponseType
  error?: string
}

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