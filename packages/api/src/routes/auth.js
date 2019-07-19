import { Router } from 'express'

const router = Router()

router.post('/session', (req, res) => {
    req.context.me = Object.values(req.context.models.users).find(
        (x) => x.username === req.body.username
    )
    if (req.context.me) {
        res.send(req.context.me)
    }
    res.status(401).send({
        message: `No account found for ${req.body.username}.`,
    })
})

router.delete('/session', (req, res) => {
    req.context.me = null
    res.status(200).send()
})

router.get('/me', (req, res) => {
    if (req.context.me) {
        res.send(req.context.me)
    }
    res.status(404).send()
})

export default router
