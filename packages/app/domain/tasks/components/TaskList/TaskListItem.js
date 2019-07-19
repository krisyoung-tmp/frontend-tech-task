import css from './TaskListItem.module.scss'
import React from 'react'
import dt from '../../../../utils/date'
import { useSpring, animated } from 'react-spring'
import { colorMap, statusTransitionMap } from '../../constants'
import {
    Card,
    CardHeader,
    CardFooter,
} from '../../../../styleguide/components/Card'
import { useTaskActions } from '../../context'
import cx from 'classnames'
import { TaskStatusIcon } from '../TaskStatusIcon'

const FormattedDescription = ({ description, truncateAt = 120 }) => {
    if (description.length < truncateAt)
        return <div className={css.description}>{description}</div>
    return (
        <div className={cx(css.description, css.truncated)}>
            {description.slice(0, truncateAt)}
        </div>
    )
}

export const TaskListItem = ({
    task,
    author,
    assignee,
    selected,
    onSelect,
}) => {
    const { id, title, description, status, due_date, created_date } = task
    const { deleteTask, updateTask } = useTaskActions()
    const isOverdue = dt().isAfter(due_date)
    const [showActions, setShowActions] = React.useState(false)
    const [height, setHeight] = React.useState(0)
    const [width, setWidth] = React.useState(0)
    const contentRef = React.useRef(null)
    const actionsRef = React.useRef(null)
    const containercss = useSpring({
        transform: showActions ? `translateX(-${width}px)` : `translateX(0px)`,
    })

    const handleSelect = React.useCallback(() => {
        onSelect(id)
    })

    const handleStatusChange = React.useCallback(
        (ev) => {
            status === 'DELETED'
                ? deleteTask(task.id)
                : updateTask({ ...task, status: ev.currentTarget.value })
        },
        [task, deleteTask, updateTask]
    )

    React.useLayoutEffect(() => {
        const el = contentRef.current
        const actionsEl = actionsRef.current
        if (!el) return
        setHeight(el.getBoundingClientRect().height)
        setWidth(actionsEl.getBoundingClientRect().width)
    }, [contentRef, status])

    return (
        <Card
            data-testid="tasklist.item"
            className={cx(css.container, {
                [css.selected]: selected,
            })}
            style={{
                borderColor: colorMap[status],
            }}
        >
            <div
                style={{
                    borderColor: colorMap[status],
                }}
            >
                <CardHeader
                    icon={
                        <TaskStatusIcon
                            status={status}
                            width={24}
                            height={24}
                            className={css.icon}
                            fill={colorMap[status]}
                        />
                    }
                    className={css.header}
                    title={
                        <h1 className={css.title}>
                            <a onClick={handleSelect}>{title}</a>{' '}
                        </h1>
                    }
                ></CardHeader>
                <div
                    onMouseEnter={() => setShowActions(true)}
                    onMouseLeave={() => setShowActions(false)}
                    style={{
                        display: 'flex',
                        position: 'relative',
                        height: `${height}px`,
                    }}
                >
                    <animated.div
                        style={{
                            flex: '1 1 auto',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            backgroundColor: 'white',
                            width: '100%',
                            ...containercss,
                        }}
                    >
                        <div className={css.content} ref={contentRef}>
                            <div className={css.taskBody}>
                                <FormattedDescription
                                    description={description}
                                />
                                {assignee && (
                                    <div className={css.assignee}>
                                        Assigned to{' '}
                                        <span className={css.username}>
                                            {assignee.username}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </animated.div>
                    <aside className={css.actions} ref={actionsRef}>
                        {statusTransitionMap[status].includes(
                            'IN_PROGRESS'
                        ) && (
                            <animated.button
                                onClick={handleStatusChange}
                                value="IN_PROGRESS"
                                className={css.action}
                                style={{ background: 'blue', color: 'white' }}
                            >
                                <TaskStatusIcon
                                    status="IN_PROGRESS"
                                    width={24}
                                    height={24}
                                    className={css.icon}
                                />
                                {status === 'PAUSED' ? 'Resume' : 'Start'}
                            </animated.button>
                        )}
                        {statusTransitionMap[status].includes('PAUSED') && (
                            <animated.button
                                onClick={handleStatusChange}
                                value="PAUSED"
                                className={css.action}
                                style={{ background: 'orange', color: 'white' }}
                            >
                                <TaskStatusIcon
                                    status="PAUSED"
                                    width={24}
                                    height={24}
                                    className={css.icon}
                                />
                                Pause
                            </animated.button>
                        )}
                        {statusTransitionMap[status].includes('COMPLETED') && (
                            <animated.button
                                onClick={handleStatusChange}
                                value="COMPLETED"
                                className={css.action}
                                style={{ background: 'green', color: 'white' }}
                            >
                                <TaskStatusIcon
                                    status="COMPLETED"
                                    width={24}
                                    height={24}
                                    className={css.icon}
                                />
                                Complete
                            </animated.button>
                        )}
                        {statusTransitionMap[status].includes('DELETED') && (
                            <animated.button
                                onClick={handleStatusChange}
                                value="DELETED"
                                className={css.action}
                                style={{ background: 'red', color: 'white' }}
                            >
                                <TaskStatusIcon
                                    status="DELETED"
                                    width={24}
                                    height={24}
                                    className={css.icon}
                                />
                                Delete
                            </animated.button>
                        )}
                    </aside>
                </div>
                <CardFooter className={css.footer}>
                    <div className={css.meta}>
                        {author && (
                            <div>
                                Created by{' '}
                                <span className={css.username}>
                                    {author.username}
                                </span>{' '}
                                <time dateTime={created_date}>
                                    {dt(created_date).fromNow()}
                                </time>
                            </div>
                        )}
                    </div>
                    <div className={css.dueDate}>
                        Due:{' '}
                        <time
                            dateTime={due_date}
                            className={css.date}
                            style={{ color: isOverdue ? 'darkred' : 'inherit' }}
                        >
                            {dt().to(due_date)}
                        </time>
                    </div>
                </CardFooter>
            </div>
        </Card>
    )
}
