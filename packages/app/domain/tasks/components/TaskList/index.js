import React from 'react'
import { compose } from 'lodash/fp'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../../../../styleguide/components/Card'
import { SearchField } from '../../../../styleguide/components/SearchField'
import { SelectField } from '../../../../styleguide/components/SelectField'
import { Radio } from '../../../../styleguide/components/Radio'
import { Dropdown } from '../../../../styleguide/components/Dropdown'
import { TaskListItem } from './TaskListItem'
import { useAuthState } from '../../../auth/context'
import { useUserState } from '../../../users/context'
import { useTaskState } from '../../context'
import { statuses } from '../../constants'
import css from './TaskList.module.scss'
import { FilterIcon } from '../../../../styleguide/icons'
import { useUIActions, useUIState } from '../../../ui/context'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { sortBy } from 'lodash'

const ListItem = ({ index, style, data }) => {
    const { data: users } = useUserState()
    const { tasks: { selected } = {} } = useUIState()
    const { selectTask } = useUIActions()
    const task = data[index]

    return (
        <div className={css.listitem} style={style}>
            <TaskListItem
                selected={selected === task.id}
                onSelect={selectTask}
                key={task.id}
                task={task}
                assignee={users.find((x) => x.id === task.assignee)}
                author={users.find((x) => x.id === task.author)}
            />
        </div>
    )
}

const FilterPanel = ({ filters, sort, onFiltersChange, onSortChange }) => {
    const handleSortChange = React.useCallback(
        (value) => {
            onSortChange(value)
        },
        [onSortChange]
    )
    const handleStatusFilterChange = React.useCallback(
        (value) =>
            onFiltersChange((state) => ({
                ...state,
                status: value === 'ALL' ? '' : value,
            })),
        [onFiltersChange]
    )

    const handleRelationshipFilter = React.useCallback(
        (value) =>
            onFiltersChange((state) => ({
                ...state,
                relationship: value,
            })),
        [onFiltersChange]
    )
    return (
        <Card>
            <CardBody>
                <div className={css.filter}>
                    <h4>Sort</h4>
                    <Radio
                        data-testid="sort"
                        id="sort.created"
                        name="sort"
                        label="Created date"
                        value="created_date"
                        checked={sort === 'created_date'}
                        onChange={handleSortChange}
                    />
                    <Radio
                        data-testid="sort"
                        id="sort.due"
                        name="sort"
                        label="Due date"
                        value="due_date"
                        checked={sort === 'due_date'}
                        onChange={handleSortChange}
                    />
                </div>

                <div className={css.filter}>
                    <h4>Filters</h4>
                    <SelectField
                        data-testid="filters.status"
                        value={filters.status}
                        options={[['ALL', 'All Statuses']]
                            .concat(Object.entries(statuses))
                            .map(([value, label]) => ({
                                value,
                                label,
                            }))}
                        onChange={handleStatusFilterChange}
                    />
                </div>
                <div className={css.filter}>
                    <Radio
                        data-testid="filters.relationship"
                        id="filters.relationship.any"
                        name="filters.relationship"
                        label="Any"
                        value=""
                        checked={!filters.relationship}
                        onChange={handleRelationshipFilter}
                    />
                    <Radio
                        data-testid="filters.relationship"
                        id="filters.relationship.assignee"
                        name="filters.relationship"
                        label="Assigned to me"
                        value="ASSIGNEE"
                        checked={filters.relationship === 'ASSIGNEE'}
                        onChange={handleRelationshipFilter}
                    />
                    <Radio
                        data-testid="filters.relationship"
                        id="filters.relationship.author"
                        name="filters.relationship"
                        label="Reported by me"
                        value="AUTHOR"
                        checked={filters.relationship === 'AUTHOR'}
                        onChange={handleRelationshipFilter}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

const filterByQuery = (query) => (tasks) =>
    !query
        ? tasks
        : tasks.filter((task) =>
              `${task.title}|${task.description}`
                  .toLowerCase()
                  .includes(query.toLowerCase())
          )

const filterByStatus = (status) => (tasks) =>
    !status ? tasks : tasks.filter((task) => status === task.status)

const filterByRelationship = (relationship, user) => (tasks) =>
    !relationship
        ? tasks
        : tasks.filter(
              (task) =>
                  (relationship === 'AUTHOR' && task.author === user) ||
                  (relationship === 'ASSIGNEE' && task.assignee === user)
          )

export function TaskList() {
    const { data: tasks = [] } = useTaskState()
    const { data: users } = useUserState()
    const { data: authenticatedUser } = useAuthState()
    const [filters, setFilters] = React.useState({})
    const [sort, setSort] = React.useState('created_date')
    const handleQueryFilterChange = React.useCallback(
        (value) => setFilters((state) => ({ ...state, query: value })),
        [setFilters]
    )

    const visibleTasks = React.useMemo(
        () =>
            tasks &&
            compose(
                (tasks) =>
                    sort === 'due_date'
                        ? sortBy(tasks, (x) => x[sort])
                        : sortBy(tasks, (x) => x[sort]).reverse(),
                filterByQuery(filters.query),
                filterByStatus(filters.status),
                filterByRelationship(
                    filters.relationship,
                    authenticatedUser.id
                ),
                (tasks) => tasks.filter((x) => x.status !== 'DELETED')
            )(tasks),
        [tasks, filters, sort]
    )

    return (
        <Card className={css.container}>
            <CardHeader
                actions={
                    <Dropdown
                        data-testid="filters.trigger"
                        variant="invisible"
                        label={<FilterIcon width={24} height={24} />}
                    >
                        <FilterPanel
                            filters={filters}
                            sort={sort}
                            onFiltersChange={setFilters}
                            onSortChange={setSort}
                        />
                    </Dropdown>
                }
            >
                <div style={{ flex: '1 1 auto' }}>
                    <SearchField
                        data-testid="filters.query"
                        onChange={handleQueryFilterChange}
                        placeholder="Search tasks..."
                    />
                </div>
            </CardHeader>
            <CardBody className={css.body}>
                {!tasks || !users ? (
                    <div>Loadings...</div>
                ) : (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className={css.tasks}
                                height={height}
                                itemCount={visibleTasks.length}
                                itemData={visibleTasks}
                                itemSize={200}
                                width={width}
                            >
                                {ListItem}
                            </List>
                        )}
                    </AutoSizer>
                )}
            </CardBody>
            <CardFooter className={css.footer} data-testid="tasklist.footer">
                Showing {visibleTasks.length} of {tasks.length} tasks
            </CardFooter>
        </Card>
    )
}
