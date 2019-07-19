import React from 'react'
import { Button } from '../../../../styleguide/components/Button'
import { useAuthState, useAuthActions } from '../../context'
import css from './IdentityPanel.module.scss'
import { useDependencies } from '../../../../dependencies/context'
import { useUIState } from '../../../ui/context'

export const IdentityPanel = () => {
    const { storage } = useDependencies()
    const { device } = useUIState()
    const { data: authenticatedUser } = useAuthState()
    const { signOut } = useAuthActions()
    const handleSignout = React.useCallback(() => {
        signOut()
        storage.remove('auth_token')
    })
    if (!authenticatedUser) return null

    return (
        <div className={css.container}>
            {device === 'desktop' && (
                <span className={css.username}>
                    {authenticatedUser.username}
                </span>
            )}
            <Button onClick={handleSignout}>Sign out</Button>
        </div>
    )
}
