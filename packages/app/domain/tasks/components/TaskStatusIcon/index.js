import React from 'react'
import {
    StopIcon,
    PlayIcon,
    PauseIcon,
    CompleteIcon,
    DeleteIcon,
} from '../../../../styleguide/icons'

export const TaskStatusIcon = ({ status, ...props }) => {
    const Icon = {
        NOT_STARTED: StopIcon,
        IN_PROGRESS: PlayIcon,
        PAUSED: PauseIcon,
        COMPLETED: CompleteIcon,
        DELETED: DeleteIcon,
    }[status]

    return <Icon {...props} />
}
