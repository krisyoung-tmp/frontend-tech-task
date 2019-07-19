import React from 'react'
import App, { Container } from 'next/app'
import { createHTTPClient, createStorage } from '../dependencies'
import { DependencyProvider } from '../dependencies/context'
import { UIProvider } from '../domain/ui/context'
import { AuthProvider } from '../domain/auth/context'
import { TaskProvider } from '../domain/tasks/context'
import { UserProvider } from '../domain/users/context'

class AsuraTaskApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    componentWillMount() {
        const storage = createStorage()
        const http = createHTTPClient(
            { baseURL: 'http://localhost:9001' },
            { storage }
        )
        this.http = http
        this.storage = storage
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <DependencyProvider http={this.http} storage={this.storage}>
                    <AuthProvider>
                        <UIProvider>
                            <UserProvider>
                                <TaskProvider>
                                    <Component {...pageProps} />
                                </TaskProvider>
                            </UserProvider>
                        </UIProvider>
                    </AuthProvider>
                </DependencyProvider>
            </Container>
        )
    }
}

export default AsuraTaskApp
