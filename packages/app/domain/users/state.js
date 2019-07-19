export const GET_USERS_REQUEST = '@@api/users/REQUEST'
export const GET_USERS_COMPLETE = '@@api/users/COMPLETE'

export const actionFactory = ({ api, dispatch }) => {
    const getUsers = async () => {
        dispatch({ type: GET_USERS_REQUEST })

        const result = await api
            .getAll()
            .catch((payload) => ({ error: payload }))
        dispatch({
            type: GET_USERS_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }

    return { getUsers }
}

export const reducer = (state, action) => {
    const { type, payload, meta, error } = action
    if (type === GET_USERS_REQUEST)
        return {
            ...state,
            processing: true,
            error: null,
        }
    if (type === GET_USERS_COMPLETE)
        return {
            ...state,
            data: error ? null : payload,
            error: error ? payload : null,
            processing: false,
        }
    return state
}
