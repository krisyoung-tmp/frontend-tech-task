import uuidv4 from 'uuid/v4'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    const tasks = Object.values(req.context.models.tasks)
    return res.send(tasks)
})

router.get('/:id', (req, res) => {
    const task = req.context.models.tasks[req.params.id]
    return res.send(task)
})

router.post('/', (req, res) => {
    const id = uuidv4()
    const task = {
        id,
        ...req.body,
        author: req.context.me.id,
        status: 'NOT_STARTED',
    }

    req.context.models.tasks[id] = task

    return res.status(201).send(task)
})

router.put('/:id', (req, res) => {
    const { [req.params.id]: task, ...rest } = req.context.models.tasks
    const data = req.body
    const next =
        task.author === req.context.me.id
            ? { ...task, ...data }
            : { ...task, status: data.status ? data.status : task.status }
    req.context.models.tasks = { [req.params.id]: next, ...rest }
    return res.send(next)
})

router.delete('/:id', (req, res) => {
    const { [req.params.id]: task, ...rest } = req.context.models.tasks
    if (task.author === req.context.me.id) {
        req.context.models.tasks = rest
        return res.send(task)
    }
    return res.status(401).send(null)
})

export default router
