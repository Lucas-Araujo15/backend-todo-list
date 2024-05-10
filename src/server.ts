import express, { Request, Response } from 'express'
import { Task } from './models/Task'
import { createDbConnection } from './config/database'
import { TaskRepository } from './repositories/task.repository'

interface RequestBody {
    name: string
}

const app = express()

app.use(express.json())

const PORT = 3333

let tasks: Task[] = []

const db = createDbConnection()

const taskRepository = new TaskRepository(db)

app.post('/tasks', (request: Request, response: Response) => {
    try {
        const { name } = request.body as RequestBody
        const task = new Task(name)
        tasks.push(task)

        taskRepository.insert(task)
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});

app.get('/tasks/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const task = await taskRepository.findOne(id)

        if (typeof task === 'undefined') {
            return response.status(404).send()
        }

        return response.status(200).json({ task })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }

});


app.get('/tasks', async (request: Request, response: Response) => {
    try {
        const tasks = await taskRepository.findAll()
        
        return response.status(200).json({ tasks })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});


app.put('/tasks/:id', (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name } = request.body

        const task: Task = {
            id,
            name
        }

        taskRepository.update(task)

        return response.status(204).send()
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});


app.delete('/tasks/:id', (request: Request, response: Response) => {
    try {
        const { id } = request.params
        taskRepository.delete(id)
        return response.status(204).send()
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});