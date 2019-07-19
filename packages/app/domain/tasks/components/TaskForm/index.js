import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../../../../styleguide/components/Card'
import { InputField } from '../../../../styleguide/components/InputField'
import { SelectField } from '../../../../styleguide/components/SelectField'
import { Button } from '../../../../styleguide/components/Button'
import { CloseIcon } from '../../../../styleguide/icons'
import { useUserState } from '../../../users/context'
import dt from '../../../../utils/date'
import css from './TaskForm.module.scss'
import { ScrollView } from '../../../../styleguide/components/ScrollView'

export const TaskForm = ({
    title,
    task,
    onSubmit = () => {},
    onCancel = () => {},
    onClose = () => {},
    ...otherProps
}) => {
    const { data: users } = useUserState()
    const [draft, setDraft] = React.useState({ ...task })
    const { title: taskTitle, description, assignee, due_date } = draft

    React.useEffect(() => {
        setDraft({ ...task })
    }, [task])

    const onChange = React.useCallback(
        (key, value) => {
            setDraft({ ...draft, [key]: value })
        },
        [draft, setDraft]
    )

    const validity = React.useMemo(() => {
        const fields = {
            title: draft.title && draft.title.length > 2,
            due_date: draft.due_date && dt(draft.due_date).isValid(),
            assignee: Boolean(draft.assignee),
        }
        return {
            ...fields,
            isValid: Object.values(fields).every((x) => x),
        }
    }, [draft])

    const handleSubmit = React.useCallback(() => {
        onSubmit(draft)
    }, [draft, onSubmit])

    const handleCancel = React.useCallback(() => {
        setDraft({ ...task })
        onCancel()
    }, [task, setDraft, onCancel])

    const handleClear = React.useCallback(() => {
        setDraft({ ...task })
    }, [task, setDraft])

    const handleTitleChange = React.useCallback(
        (value) => onChange('title', value),
        [onChange]
    )

    const handleDescriptionChange = React.useCallback(
        (value) => onChange('description', value),
        [onChange]
    )

    const handleAssigneeChange = React.useCallback(
        (value) => onChange('assignee', value),
        [onChange]
    )

    const handleDueDateChange = React.useCallback(
        (value) => onChange('due_date', value),
        [onChange]
    )

    return (
        <Card className={css.container} {...otherProps}>
            <CardHeader
                title={title}
                actions={
                    <Button variant="invisible" onClick={onClose}>
                        <CloseIcon width={40} height={40} />
                    </Button>
                }
            />
            <CardBody>
                <ScrollView>
                    <div className={css.fieldGroup}>
                        <InputField
                            label="Title"
                            value={taskTitle || ''}
                            name="task.title"
                            onChange={handleTitleChange}
                        />
                        <InputField
                            label="Description"
                            type="multiline-text"
                            value={description || ''}
                            name="task.description"
                            onChange={handleDescriptionChange}
                        />
                        <SelectField
                            label="Assignee"
                            name="task.assignee"
                            value={assignee || ''}
                            options={[
                                { value: '', label: 'Select assignee...' },
                            ].concat(
                                users
                                    ? users.map((x) => ({
                                          value: x.id,
                                          label: x.username,
                                      }))
                                    : []
                            )}
                            onChange={handleAssigneeChange}
                        />
                        <InputField
                            label="Date Due"
                            type="date"
                            value={dt(due_date).format('YYYY-MM-DD') || ''}
                            name="task.due_date"
                            onChange={handleDueDateChange}
                        />
                    </div>
                </ScrollView>
            </CardBody>
            <CardFooter className={css.actions}>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="invisible" onClick={handleClear}>
                    Clear
                </Button>
                <Button
                    data-testid="task.submit"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!validity.isValid}
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}
