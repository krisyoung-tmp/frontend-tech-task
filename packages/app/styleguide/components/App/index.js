import React from 'react'
import css from './App.module.scss'
import { IdentityPanel } from '../../../domain/auth/components/IdentityPanel'
import { useUIState } from '../../../domain/ui/context'

export const AppContainer = ({ children }) => (
    <div className={css.container}>{children}</div>
)

export const AppHeader = ({ children }) => {
    const { device } = useUIState()
    return (
        <header className={css.header}>
            <div className={css.content}>
                <img
                    src="/static/logo@2x.png"
                    height="50"
                    className={css.logo}
                />
                {device === 'desktop' && (
                    <h1 className={css.title}>asuraFT Tasks</h1>
                )}
                <IdentityPanel />
            </div>
        </header>
    )
}
export const AppBody = ({ children }) => (
    <main className={css.body}>
        <div className={css.content}>{children}</div>
    </main>
)
export const AppFooter = ({ children }) => (
    <footer className={css.footer}>
        <div className={css.content}>{children}</div>
    </footer>
)
