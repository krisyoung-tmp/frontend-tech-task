import React from 'react'
import T from 'prop-types'
import {
    VictoryChart,
    VictoryBar,
    VictoryAxis,
    VictoryTooltip,
    VictoryStack,
    VictoryLegend,
} from 'victory'
import { Flyover } from '../../../../styleguide/components/Flyover'
import {
    Card,
    CardHeader,
    CardBody,
} from '../../../../styleguide/components/Card'
import { Button } from '../../../../styleguide/components/Button'
import { CloseIcon } from '../../../../styleguide/icons'
import { useUserState } from '../../../users/context'
import { useTaskState } from '../../../tasks/context'
import { statuses } from '../../../tasks/constants'
import css from './TaskStats.module.scss'

const { DELETED, ...categories } = statuses

const TaskStats = ({ onClose = () => {} }) => {
    const { data: tasks } = useTaskState()
    const { data: assignees } = useUserState()
    const countData = React.useMemo(
        () =>
            tasks.reduce((acc, task) => {
                const existingTask = (acc[task.assignee] || []).find(
                    (x) => x.status === task.status
                )

                return {
                    ...acc,
                    [task.assignee]: existingTask
                        ? (acc[task.assignee || 'unassigned'] || []).map((x) =>
                              x.status === existingTask.status
                                  ? {
                                        ...existingTask,
                                        count: existingTask.count + 1,
                                        label: `${existingTask.count + 1}`,
                                    }
                                  : x
                          )
                        : (acc[task.assignee || 'unassigned'] || []).concat({
                              status: task.status,
                              count: 1,
                              label: '1',
                          }),
                }
            }, {}),
        [tasks]
    )

    return (
        <Card className={css.container}>
            <CardHeader
                title="Task Statistics"
                actions={
                    <Button variant="invisible" onClick={onClose}>
                        <CloseIcon width={40} height={40} />
                    </Button>
                }
            />
            <CardBody>
                <VictoryChart
                    height={240}
                    padding={{ left: 60, bottom: 50, right: 20 }}
                    domainPadding={{ x: 25, y: 5 }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                    }}
                >
                    <VictoryAxis
                        tickValues={Object.keys(categories)}
                        tickFormat={Object.values(categories)}
                        style={{
                            grid: {
                                stroke: 'lightGray',
                                strokeDasharray: '8, 8',
                            },
                            tickLabels: { fill: 'gray', fontSize: 10 },
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            grid: {
                                stroke: 'lightGray',
                                strokeDasharray: '8, 8',
                            },
                            tickLabels: { fill: 'gray', fontSize: 10 },
                        }}
                    />
                    <VictoryStack colorScale={'red'}>
                        {Object.entries(countData).map(
                            ([assignee, data], idx) => (
                                <VictoryBar
                                    key={assignee}
                                    horizontal={true}
                                    labelComponent={
                                        <VictoryTooltip
                                            cornerRadius={2}
                                            flyoutStyle={{
                                                fill: 'rgba(0,0,0,0.6)',
                                                stroke: 0,
                                            }}
                                            style={{
                                                fontSize: 10,
                                                fill: 'white',
                                            }}
                                            pointerWidth={5}
                                            pointerLength={5}
                                        />
                                    }
                                    barRatio={0.75}
                                    data={data}
                                    x="status"
                                    y="count"
                                />
                            )
                        )}
                    </VictoryStack>
                </VictoryChart>
                <VictoryLegend
                    height={40}
                    orientation="horizontal"
                    gutter={20}
                    style={{
                        title: { fontSize: 12 },
                    }}
                    colorScale={'red'}
                    data={Object.keys(countData).map((id) => ({
                        name: assignees.find((x) => x.id === id).username,
                    }))}
                />
            </CardBody>
        </Card>
    )
}

export const TaskStatsFlyover = ({ show, onClose }) => {
    return (
        <Flyover show={show}>
            <TaskStats onClose={onClose} />
        </Flyover>
    )
}
TaskStatsFlyover.propTypes = {
    show: T.bool,
    onClose: T.func,
}
