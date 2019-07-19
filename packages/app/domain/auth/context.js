import React from 'react'
import T from 'prop-types'
import { reducer, actionFactory } from './state'
import { useDependencies } from '../../dependencies/context'
import { createApi } from './api'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const { http, storage } = useDependencies()

    const [state, dispatch] = React.useReducer(reducer, {})
    const actions = React.useMemo(() => {
        const api = createApi(http)
        return actionFactory({ api, storage, dispatch })
    }, [http, dispatch])

    const value = React.useMemo(
        () => ({
            state,
            actions,
        }),
        [state, actions]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}

export function useAuthState(selector = (x) => x) {
    const { state } = React.useContext(AuthContext)
    return selector(state)
}

export const useAuthActions = () => {
    const { actions } = React.useContext(AuthContext)
    return actions
}
