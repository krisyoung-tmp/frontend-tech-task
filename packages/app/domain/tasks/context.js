import React from 'react'
import T from 'prop-types'
import { reducer, actionFactory } from './state'
import { useDependencies } from '../../dependencies/context'
import { createApi } from './api'

export const TaskContext = React.createContext({})

export const TaskProvider = ({ children }) => {
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
    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

TaskProvider.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
}

export function useTaskState(selector = (x) => x) {
    const { state } = React.useContext(TaskContext)
    return selector(state)
}

export const useTaskActions = () => {
    const { actions } = React.useContext(TaskContext)
    return actions
}
