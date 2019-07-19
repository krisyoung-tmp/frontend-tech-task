import React from 'react'
import Head from 'next/head'
import { debounce } from 'lodash'

import { DependencyProvider } from '../../../dependencies/context'
import { AuthProvider, useAuthState } from '../../../domain/auth/context'
import { TaskProvider } from '../../../domain/tasks/context'
import { UserProvider } from '../../../domain/users/context'
import { AppContainer, AppHeader, AppBody, AppFooter } from '../App'
import { createHTTPClient } from '../../../dependencies/api'
import '../../../styleguide/styles/global.scss'
import { AuthBoundary } from '../../../domain/auth/components/AuthBoundary'
import { Button } from '../Button'

export const Provider = ({ children }) => {
    const http = createHTTPClient({ baseURL: 'http://localhost:9001' })

    return (
        <DependencyProvider http={http}>
            <AuthProvider>
                <UserProvider>
                    <TaskProvider>
                        <Head>
                            <title>asuraFT Tasks</title>
                            <link
                                href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800"
                                rel="stylesheet"
                            />
                        </Head>
                        {children}
                    </TaskProvider>
                </UserProvider>
            </AuthProvider>
        </DependencyProvider>
    )
}

export const withLayout = (BaseComponent) => (props) => {
    const { data: authenticatedUser } = useAuthState()
    const [isDesktop, setIsDesktop] = React.useState(null)
    const [showTaskStats, setShowTaskStats] = React.useState(false)
    const [draft, setDraft] = React.useState(null)

    React.useEffect(() => {
        const mq = window.matchMedia('(min-width: 800px)')
        const onResize = debounce(() => setIsDesktop(mq.matches), 66)
        window.addEventListener('resize', onResize)
        onResize()
        return () => window.removeEventListener('resize', onResize)
    }, [setIsDesktop])

    return (
        <AppContainer>
            <AppHeader />
            <AppBody>
                <AuthBoundary>
                    <BaseComponent
                        {...props}
                        draft={draft}
                        isDesktop={isDesktop}
                        setDraft={setDraft}
                        showTaskStats={showTaskStats}
                        onCloseTaskStats={() => setShowTaskStats(false)}
                    />
                </AuthBoundary>
            </AppBody>

            {authenticatedUser && (
                <AppFooter>
                    <Button onClick={() => setShowTaskStats(true)}>
                        Task Statistics
                    </Button>
                    {!isDesktop && (
                        <Button onClick={() => setDraft({})}>
                            Create Task
                        </Button>
                    )}
                </AppFooter>
            )}
        </AppContainer>
    )
}
