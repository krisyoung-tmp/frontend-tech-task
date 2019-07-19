import React from 'react'
import T from 'prop-types'
import { reducer, actionFactory } from './state'
import { useDependencies } from '../../dependencies/context'

export const UIContext = React.createContext({})

export const UIProvider = ({ children }) => {
    const { http } = useDependencies()

    const [state, dispatch] = React.useReducer(reducer, {})
    const actions = React.useMemo(() => {
        return actionFactory({ dispatch })
    }, [http, dispatch])

    const value = React.useMemo(
        () => ({
            state,
            actions,
        }),
        [state, actions]
    )
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

UIProvider.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}

export function useUIState(selector = (x) => x) {
    const { state } = React.useContext(UIContext)
    return selector(state)
}

export const useUIActions = () => {
    const { actions } = React.useContext(UIContext)
    return actions
}
