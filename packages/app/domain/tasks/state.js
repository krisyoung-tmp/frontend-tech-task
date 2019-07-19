export const GET_TASKS_REQUEST = '@@api/tasks/REQUEST'
export const GET_TASKS_COMPLETE = '@@api/tasks/RECEIVE'
export const CREATE_TASK_REQUEST = '@@api/tasks/CREATE_REQUEST'
export const CREATE_TASK_COMPLETE = '@@api/tasks/CREATE_COMPLETE'
export const UPDATE_TASK_REQUEST = '@@api/tasks/UPDATE_REQUEST'
export const UPDATE_TASK_COMPLETE = '@@api/tasks/UPDATE_COMPLETE'
export const DELETE_TASK_REQUEST = '@@api/tasks/DELETE_REQUEST'
export const DELETE_TASK_COMPLETE = '@@api/tasks/DELETE_COMPLETE'

export const actionFactory = ({ api, dispatch }) => {
    const getTasks = async () => {
        dispatch({ type: GET_TASKS_REQUEST })

        const result = await api
            .getAll()
            .catch((payload) => ({ error: payload }))
        dispatch({
            type: GET_TASKS_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }

    const createTask = async (task, callback) => {
        dispatch({ type: CREATE_TASK_REQUEST, payload: task })
        const result = await api
            .create(task)
            .catch((payload) => ({ error: payload }))

        dispatch({
            type: CREATE_TASK_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })

        callback(result)
    }

    const updateTask = async (task) => {
        dispatch({ type: UPDATE_TASK_REQUEST, payload: task })
        const result = await api
            .update(task)
            .catch((payload) => ({ error: payload }))

        dispatch({
            type: UPDATE_TASK_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }

    const deleteTask = async (id) => {
        dispatch({ type: DELETE_TASK_REQUEST, payload: id })
        const result = await api
            .destroy(id)
            .catch((payload) => ({ error: payload }))

        dispatch({
            type: DELETE_TASK_COMPLETE,
            payload: result,
            error: Boolean(result.error),
        })
    }

    return { getTasks, createTask, updateTask, deleteTask }
}

export const reducer = (state, action) => {
    const { type, payload, meta, error } = action
    if (
        [
            GET_TASKS_REQUEST,
            CREATE_TASK_REQUEST,
            UPDATE_TASK_REQUEST,
            DELETE_TASK_REQUEST,
        ].includes(type)
    )
        return {
            ...state,
            processing: true,
            error: null,
        }
    if (type === GET_TASKS_COMPLETE)
        return {
            ...state,
            data: error ? null : payload,
            error: error ? payload : null,
            processing: false,
        }
    if (type === CREATE_TASK_COMPLETE)
        return {
            ...state,
            data: error ? state.data : state.data.concat(payload),
            error: error ? payload : null,
            processing: false,
        }
    if (type === UPDATE_TASK_COMPLETE)
        return {
            ...state,
            data: error
                ? state.data
                : state.data.map((x) => (x.id === payload.id ? payload : x)),
            error: error ? payload : null,
            processing: false,
        }
    if (type === DELETE_TASK_COMPLETE) {
        return {
            ...state,
            data: error
                ? state.data
                : state.data.filter((x) => x.id !== payload.id),
            error: error ? payload : null,
            processing: false,
        }
    }

    return state
}
