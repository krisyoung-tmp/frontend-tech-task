import React from 'react'
import T from 'prop-types'

export const DependencyContext = React.createContext({})

export const DependencyProvider = ({ children, http, storage }) => {
    const value = React.useMemo(() => ({ http, storage }), [http, storage])
    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    )
}
DependencyProvider.propTypes = {
    children: T.oneOfType([T.node, T.arrayOf(T.node), T.func]),
    http: T.func,
}

export function useDependencies() {
    const dependencies = React.useContext(DependencyContext)
    return dependencies
}
