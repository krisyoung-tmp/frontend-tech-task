export const CREATE_SESSION_REQUEST = '@@api/auth/CREATE_SESSION_REQUEST'
export const CREATE_SESSION_COMPLETE = '@@api/auth/CREATE_SESSION_COMPLETE'
export const DESTROY_SESSION_REQUEST = '@@api/auth/DESTROY_SESSION_REQUEST'
export const DESTROY_SESSION_COMPLETE = '@@api/auth/DESTROY_SESSION_COMPLETE'
export const GET_AUTHENTICATED_USER_REQUEST =
    '@@api/auth/AUTHENTICATED_USER_REQUEST'
export const GET_AUTHENTICATED_USER_COMPLETE =
    '@@api/auth/AUTHENTICATED_USER_COMPLETE'

export const actionFactory = ({ api, storage, dispatch }) => {
    const signIn = async ({ username }) => {
        dispatch({ type: CREATE_SESSION_REQUEST })

        const result = await api
            .signIn({ username })
            .catch((payload) => ({ error: payload }))
        dispatch({
            type: CREATE_SESSION_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }
    const signOut = async () => {
        dispatch({ type: DESTROY_SESSION_REQUEST })

        const result = await api
            .signOut()
            .catch((payload) => ({ error: payload }))
        dispatch({
            type: DESTROY_SESSION_COMPLETE,
            error: Boolean(result.error),
        })
    }
    const getAuthenticatedUser = async ({ token }) => {
        dispatch({ type: GET_AUTHENTICATED_USER_REQUEST })

        const result = await api
            .getAuthenticatedUser({ token })
            .catch((payload) => ({ error: payload }))
        dispatch({
            type: GET_AUTHENTICATED_USER_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }

    return { signIn, signOut, getAuthenticatedUser }
}

export const reducer = (state, action) => {
    const { type, payload, error } = action
    if (
        type === GET_AUTHENTICATED_USER_REQUEST ||
        type === CREATE_SESSION_REQUEST ||
        type === DESTROY_SESSION_REQUEST
    )
        return {
            ...state,
            processing: true,
            error: null,
        }
    if (
        type === GET_AUTHENTICATED_USER_COMPLETE ||
        type === CREATE_SESSION_COMPLETE
    )
        return {
            ...state,
            data: error ? null : payload,
            error: error ? payload : null,
            processing: false,
        }

    if (type === DESTROY_SESSION_COMPLETE)
        return {
            ...state,
            data: error ? state.data : null,
            error: error ? payload : null,
            processing: false,
        }
    return state
}
