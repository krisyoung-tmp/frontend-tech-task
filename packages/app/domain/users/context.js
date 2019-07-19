import React from 'react'
import T from 'prop-types'
import { reducer, actionFactory } from './state'
import { useDependencies } from '../../dependencies/context'
import { createApi } from './api'

export const UserContext = React.createContext({})

export const UserProvider = ({ children }) => {
    const { http } = useDependencies()

    const [state, dispatch] = React.useReducer(reducer, {})
    const actions = React.useMemo(() => {
        const api = createApi(http)
        return actionFactory({ api, dispatch })
    }, [http, dispatch])

    const value = React.useMemo(
        () => ({
            state,
            actions,
        }),
        [state, actions]
    )
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}

export function useUserState(selector = (x) => x) {
    const { state } = React.useContext(UserContext)
    return selector(state)
}

export const useUserActions = () => {
    const { actions } = React.useContext(UserContext)
    return actions
}
