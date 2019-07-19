import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../../../../styleguide/components/Card'
import { Button } from '../../../../styleguide/components/Button'
import { CloseIcon } from '../../../../styleguide/icons'
import { useAuthState } from '../../../auth/context'
import css from './TaskDetail.module.scss'
import { TaskStatusIcon } from '../TaskStatusIcon'
import { statuses, colorMap } from '../../constants'
import { useUserState } from '../../../users/context'
import dt from '../../../../utils/date'
import { ScrollView } from '../../../../styleguide/components/ScrollView'

export const TaskDetail = ({ task, onEdit = () => {}, onClose }) => {
    const { data: authenticatedUser } = useAuthState()
    const { data: users } = useUserState()
    const {
        title,
        description,
        status,
        due_date,
        created_date,
        updated_date,
        completed_date,
    } = task

    const author = React.useMemo(
        () => users.find((x) => x.id === task.author),
        [users, task]
    )
    const assignee = React.useMemo(
        () => users.find((x) => x.id === task.assignee),
        [users, task]
    )

    const editable =
        author.id === authenticatedUser.id ||
        authenticatedUser.roles.includes('ADMIN')

    return (
        <Card data-testid="viewTask">
            <CardHeader
                icon={
                    status && (
                        <TaskStatusIcon
                            status={status}
                            width={48}
                            height={48}
                            className={css.icon}
                            fill={colorMap[status]}
                        />
                    )
                }
                title={title}
                actions={
                    <Button variant="invisible" onClick={onClose}>
                        <CloseIcon width={40} height={40} />
                    </Button>
                }
            />
            <CardBody>
                <ScrollView>
                    <dl className={css.attribute}>
                        <dt className={css.attributeName}>Title</dt>
                        <dd className={css.attributeValue}>{title}</dd>
                    </dl>
                    <dl className={css.attribute}>
                        <dt className={css.attributeName}>Description</dt>
                        <dd className={css.attributeValue}>{description}</dd>
                    </dl>
                    <div className={css.grid}>
                        <dl className={css.attribute}>
                            <dt className={css.attributeName}>Status</dt>
                            <dd className={css.attributeValue}>
                                {statuses[status]}
                            </dd>
                        </dl>
                        <dl className={css.attribute}>
                            <dt className={css.attributeName}>Due</dt>
                            <dd className={css.attributeValue}>
                                {dt(due_date).format('ddd Do MMMM YYYY')}
                            </dd>
                        </dl>
                        <dl className={css.attribute}>
                            <dt className={css.attributeName}>Author</dt>
                            <dd className={css.attributeValue}>
                                {author.username}
                            </dd>
                        </dl>
                        <dl className={css.attribute}>
                            <dt className={css.attributeName}>Created</dt>
                            <dd className={css.attributeValue}>
                                {dt(created_date).format('ddd Do MMMM YYYY')}
                            </dd>
                        </dl>
                        <dl className={css.attribute}>
                            <dt className={css.attributeName}>Assignee</dt>
                            <dd className={css.attributeValue}>
                                {assignee.username}
                            </dd>
                        </dl>
                        {updated_date && (
                            <dl className={css.attribute}>
                                <dt className={css.attributeName}>Updated</dt>
                                <dd className={css.attributeValue}>
                                    {dt(updated_date).format(
                                        'ddd Do MMMM YYYY'
                                    )}
                                </dd>
                            </dl>
                        )}
                        {completed_date && (
                            <dl className={css.attribute}>
                                <dt className={css.attributeName}>Completed</dt>
                                <dd className={css.attributeValue}>
                                    {dt(completed_date).format(
                                        'ddd Do MMMM YYYY'
                                    )}
                                </dd>
                            </dl>
                        )}
                    </div>
                </ScrollView>
            </CardBody>
            <CardFooter className={css.actions}>
                <Button
                    data-testid="showEdit"
                    onClick={onEdit}
                    disabled={!editable}
                >
                    Edit
                </Button>
            </CardFooter>
        </Card>
    )
}
