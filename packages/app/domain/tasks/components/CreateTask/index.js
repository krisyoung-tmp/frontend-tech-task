import React from 'react'
import dt from '../../../../utils/date'
import { useTaskActions } from '../../context'
import { useUIActions } from '../../../ui/context'
import { TaskForm } from '../TaskForm'

export const CreateTask = ({ onSubmit = () => {}, onClose }) => {
    const { createTask } = useTaskActions()
    const { selectTask } = useUIActions()

    const handleSubmit = React.useCallback(
        (data) => {
            createTask(
                {
                    ...data,
                    due_date: dt(data.due_date).toISOString(),
                    created_date: dt().toISOString(),
                },
                (task) => selectTask(task.id)
            )
            onSubmit()
        },
        [createTask]
    )

    return (
        <TaskForm
            data-testid="createTask"
            title="Create Task"
            task={{}}
            onSubmit={handleSubmit}
            onCancel={onClose}
            onClose={onClose}
        />
    )
}
