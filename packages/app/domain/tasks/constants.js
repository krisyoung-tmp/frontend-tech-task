export const statuses = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    PAUSED: 'Paused',
    COMPLETED: 'Completed',
    DELETED: 'Deleted',
}

export const colorMap = {
    NOT_STARTED: 'darkgrey',
    IN_PROGRESS: 'blue',
    PAUSED: 'orange',
    COMPLETED: 'green',
    DELETED: 'grey',
}

export const statusTransitionMap = {
    NOT_STARTED: ['IN_PROGRESS', 'DELETED'],
    IN_PROGRESS: ['PAUSED', 'COMPLETED', 'DELETED'],
    PAUSED: ['IN_PROGRESS', 'DELETED'],
    COMPLETED: ['DELETED'],
    DELETED: [],
}
