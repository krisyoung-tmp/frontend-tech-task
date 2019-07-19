import React from 'react'
import T from 'prop-types'
import { Flyover, positions } from '../../../styleguide/components/Flyover'
export { TaskList } from './TaskList'
import { TaskDetail } from './TaskDetail'
import { CreateTask } from './CreateTask'
import { EditTask } from './EditTask'
import { useTaskState } from '../context'
import { useUIState } from '../../ui/context'

export const TaskView = ({ onClose = () => {} }) => {
    const { tasks: { selected } = {} } = useUIState()
    const { data: tasks = [] } = useTaskState()
    const task = tasks.find((x) => x.id === selected)
    const [editing, setEditing] = React.useState(false)

    if (!selected) {
        return (
            <CreateTask onSubmit={() => setEditing(false)} onClose={onClose} />
        )
    }

    if (selected && !editing) {
        return (
            <TaskDetail
                task={task}
                onEdit={() => setEditing(true)}
                onClose={onClose}
            />
        )
    }

    return (
        <EditTask
            task={task}
            onSubmit={() => setEditing(false)}
            onCancel={() => setEditing(false)}
            onClose={onClose}
        />
    )
}

export const TaskFlyover = ({ show, onClose = () => {} }) => {
    return (
        <Flyover show={show}>
            <TaskView onClose={onClose} />
        </Flyover>
    )
}
