import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {registerReducer} from "../n3-ui/u1-fetures/components/f3-registration/register-reducer";
import {loginReducer} from "../n3-ui/u1-fetures/components/f2-login/login-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    register: registerReducer,
    login: loginReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;
