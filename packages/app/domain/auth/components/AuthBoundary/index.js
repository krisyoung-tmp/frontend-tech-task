import React from 'react'
import { useRouter } from 'next/router'
import { useAuthState, useAuthActions } from '../../context'
import { useDependencies } from '../../../../dependencies/context'
import { Loading } from '../../../../styleguide/components/Loading'

export const AuthBoundary = ({ children }) => {
    const router = useRouter()
    const { data: authenticatedUser, processing } = useAuthState()
    const { getAuthenticatedUser } = useAuthActions()
    const { storage } = useDependencies()

    React.useEffect(() => {
        const token = storage.get('auth_token')
        if (token && (!authenticatedUser || !authenticatedUser.id)) {
            getAuthenticatedUser({ token })
        }
    }, [storage, getAuthenticatedUser])

    React.useEffect(() => {
        if (authenticatedUser && authenticatedUser.id) {
            storage.set('auth_token', authenticatedUser.username)
        }
    }, [authenticatedUser, storage])

    React.useEffect(() => {
        if (
            !storage.get('auth_token') &&
            router.pathname !== '/' &&
            !authenticatedUser &&
            !processing
        ) {
            router.replace('/')
        }
    }, [router, authenticatedUser, processing])

    if (
        router.pathname === '/' ||
        (authenticatedUser && authenticatedUser.id)
    ) {
        return children
    }

    if (typeof authenticatedUser === 'undefined' || processing) {
        return <Loading />
    }

    return (
        <div
            style={{
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            You need to sign in to view this page.
        </div>
    )
}
