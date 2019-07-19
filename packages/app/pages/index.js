import React from 'react'
import { useRouter } from 'next/router'
import { Page } from '../styleguide/components/Page'
import { SignInForm } from '../domain/auth/components/SignInForm'

const SignIn = () => {
    const router = useRouter()
    return (
        <div className="container">
            <div className="column">
                <SignInForm onSuccess={() => router.replace('/tasks')} />
            </div>
        </div>
    )
}

export default () => <Page content={SignIn} />
