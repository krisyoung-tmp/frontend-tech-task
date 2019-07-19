import React from 'react'
import dt from '../../../../utils/date'
import { useTaskActions } from '../../context'
import { TaskForm } from '../TaskForm'

export const EditTask = ({
    task,
    onSubmit = () => {},
    onCancel = () => {},
    onClose = () => {},
}) => {
    const { updateTask } = useTaskActions()

    const handleSubmit = React.useCallback(
        (data) => {
            updateTask({
                ...task,
                ...data,
                updated_date: dt().toISOString(),
            })
            onSubmit()
        },
        [updateTask]
    )

    return (
        <TaskForm
            data-testid="editTask"
            title="Edit Task"
            task={task}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            onClose={onClose}
        />
    )
}
