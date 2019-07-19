import '../../../styleguide/styles/global.scss'

import React from 'react'
import Head from 'next/head'
import { debounce } from 'lodash'

import { AppContainer, AppHeader, AppBody, AppFooter } from '../App'
import { AuthBoundary } from '../../../domain/auth/components/AuthBoundary'

import { TaskFlyover } from '../../../domain/tasks/components'
import { TaskStatsFlyover } from '../../../domain/tasks/components/TaskStats'
import { useUIState, useUIActions } from '../../../domain/ui/context'

export const Page = ({
    header: PageHeader,
    content: PageContent,
    footer: PageFooter,
}) => {
    const {
        flyovers: { task: showTask, stats: showStats } = {},
        device,
    } = useUIState()
    const { setDevice, hideFlyover } = useUIActions()

    React.useEffect(() => {
        const desktopMQ = window.matchMedia('(min-width: 800px)')
        const onResize = debounce(
            () => setDevice(desktopMQ.matches ? 'desktop' : 'mobile'),
            66
        )
        window.addEventListener('resize', onResize)
        onResize()
        return () => window.removeEventListener('resize', onResize)
    }, [setDevice])

    return (
        <React.Fragment>
            <Head>
                <title>asuraFT Tasks</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800"
                    rel="stylesheet"
                />
            </Head>

            <AppContainer>
                <AppHeader>
                    <PageHeader isDesktop={device === 'desktop'} />
                </AppHeader>
                <AppBody>
                    <AuthBoundary>
                        <PageContent isDesktop={device === 'desktop'} />
                    </AuthBoundary>
                </AppBody>
                <AppFooter>
                    <PageFooter isDesktop={device === 'desktop'} />
                </AppFooter>
            </AppContainer>
            <TaskFlyover
                show={device !== 'desktop' && showTask}
                onClose={() => hideFlyover('task')}
            />
            <TaskStatsFlyover
                show={showStats}
                onClose={() => hideFlyover('stats')}
            />
        </React.Fragment>
    )
}

Page.defaultProps = {
    header: () => null,
    content: () => null,
    footer: () => null,
}
