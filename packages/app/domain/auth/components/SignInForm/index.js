import React from 'react'
import { InputField } from '../../../../styleguide/components/InputField'
import { Button } from '../../../../styleguide/components/Button'
import { useAuthState, useAuthActions } from '../../context'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../../../../styleguide/components/Card'
import css from './SignInForm.module.scss'
import { Loading } from '../../../../styleguide/components/Loading'

export const SignInForm = ({ onSuccess }) => {
    const [username, setUsername] = React.useState('')
    const { data: authenticatedUser, processing, error } = useAuthState()
    const { signIn, getAuthenticatedUser } = useAuthActions()

    const handleSubmit = React.useCallback(
        (ev) => {
            ev.preventDefault()
            signIn({ username })
        },
        [username, getAuthenticatedUser]
    )

    const handleUserNameChange = React.useCallback(
        (value) => {
            setUsername(value)
        },
        [setUsername]
    )

    React.useEffect(() => {
        if (
            authenticatedUser &&
            authenticatedUser.id &&
            typeof onSuccess === 'function'
        )
            onSuccess()
    }, [authenticatedUser])

    if (processing) return <Loading />

    return (
        <form onSubmit={handleSubmit} className={css.container}>
            <Card className={css.card}>
                <CardHeader title="Sign in" />
                <CardBody>
                    {error && (
                        <div className={css.error}>
                            {error.error.data.message}
                        </div>
                    )}
                    <InputField
                        data-testid="signin.username"
                        name="signin.username"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={handleUserNameChange}
                    />
                </CardBody>
                <CardFooter className={css.actions}>
                    <p className={css.info}>
                        For demo purposes, try one of "adminuser",
                        "standarduser1" or "standarduser2"
                    </p>
                    <Button className={css.submit} data-testid="signin.submit">
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
