import React from 'react'
import { Page } from '../styleguide/components/Page'
import { Button } from '../styleguide/components/Button'
import { useTaskActions } from '../domain/tasks/context'
import { useUserActions } from '../domain/users/context'
import { TaskList } from '../domain/tasks/components'
import { TaskView } from '../domain/tasks/components'
import css from './tasks.module.scss'
import { useUIState, useUIActions } from '../domain/ui/context'
import cx from 'classnames'

const TasksFooter = () => {
    const { selectTask, showFlyover } = useUIActions()
    return (
        <div className="actions">
            <Button onClick={() => showFlyover('stats')}>
                View Statistics
            </Button>
            <Button
                data-testid="showCreate"
                onClick={() => {
                    selectTask(null)
                    showFlyover('task')
                }}
            >
                Create New Task
            </Button>
        </div>
    )
}

function Tasks({ isDesktop }) {
    const { getTasks } = useTaskActions()
    const { getUsers } = useUserActions()
    const { flyovers: { task: showTask } = {} } = useUIState()
    const { hideFlyover } = useUIActions()

    React.useEffect(() => {
        getTasks()
        getUsers()
    }, [getTasks, getUsers])

    return (
        <div className="container">
            <div className={cx('column', css.tasks)}>
                <TaskList />
            </div>
            {isDesktop && showTask && (
                <div className={cx(css.column, css.task)}>
                    <TaskView onClose={() => hideFlyover('task')} />
                </div>
            )}
        </div>
    )
}

export default () => <Page content={Tasks} footer={TasksFooter} />
