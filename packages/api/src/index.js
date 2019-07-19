import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import cors from 'cors'
import * as routes from './routes'
import * as _models from './models'
import bearerToken from 'express-bearer-token'

let models = {}

const seed = () => {
    models = { users: { ..._models.users }, tasks: { ..._models.tasks } }
}

config({ path: path.join(__dirname, '../../../.env') })

const app = express()
app.use(cors())
app.use(bearerToken())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(models.length)
    req.context = {
        models,
        me: Object.values(models.users).find((x) => x.username === req.token),
    }
    next()
})

app.post('/reset', (req, res) => {
    seed()
    res.json(Object.values(_models.tasks).length)
})

app.use('/auth', routes.auth)
app.use('/users', routes.users)
app.use('/tasks', routes.tasks)

seed()

app.listen(process.env.API_PORT || 9000, () =>
    console.log(
        `Example app listening on port ${process.env.API_PORT || 9000}!`
    )
)
