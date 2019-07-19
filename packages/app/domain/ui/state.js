export const SELECT_TASK = '@@ui/tasks/SELECT_TASK'
export const SET_DEVICE = '@@ui/device/SET_DEVICE'
export const SHOW_FLYOVER = '@@ui/flyovers/SHOW_FLYOVER'
export const HIDE_FLYOVER = '@@ui/flyovers/HIDE_FLYOVER'

export const actionFactory = ({ dispatch }) => {
    const setDevice = (payload) => dispatch({ type: SET_DEVICE, payload })
    const selectTask = (payload) => dispatch({ type: SELECT_TASK, payload })
    const showFlyover = (payload) => dispatch({ type: SHOW_FLYOVER, payload })
    const hideFlyover = (payload) => dispatch({ type: HIDE_FLYOVER, payload })

    return { setDevice, selectTask, showFlyover, hideFlyover }
}

export const reducer = (state, action) => {
    const { type, payload } = action
    if (type === SET_DEVICE)
        return {
            ...state,
            device: payload,
        }
    if (type === SELECT_TASK)
        return {
            ...state,
            tasks: { ...(state.tasks || {}), selected: payload },
            flyovers: { ...(state.flyovers || {}), task: true, stats: false },
        }
    if (type === SHOW_FLYOVER)
        return {
            ...state,
            flyovers: { ...(state.flyovers || {}), [payload]: true },
        }
    if (type === HIDE_FLYOVER)
        return {
            ...state,
            tasks: {
                ...(state.tasks || {}),
                selected:
                    payload === 'task' ? null : (state.tasks || {}).selected,
            },
            flyovers: { ...(state.flyovers || {}), [payload]: false },
        }

    return state
}
