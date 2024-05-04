import express, { Request, Response } from 'express'
import { Task } from './models/Task'
import { createDbConnection } from './config/database'

interface RequestBody {
    name: string
}

const app = express()

app.use(express.json())

const PORT = 3333

let tasks: Task[] = []

const db = createDbConnection()

app.post('/tasks', (request: Request, response: Response) => {
    try {
        const { name } = request.body as RequestBody
        const task = new Task(name)
        tasks.push(task)

        db.run(`INSERT INTO tasks(id, name) values (?, ?)`, [task.id, task.name], (err: Error) => {
            if (err) {
                return response.status(500).json({ message: err.message })
            }
            return response.status(201).json({ message: "Tarefa criada com sucesso" })
        })

    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});

app.get('/tasks/:id', (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const task = db.get('SELECT * FROM tasks WHERE ')
        

        // const task = tasks.find((item) => item.id === id)

        // if (typeof task === 'undefined') {
        //     return response.status(404).json({ message: "Tarefa não encontrada" })
        // }

        return response.status(200).json({ task })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }

});


app.get('/tasks', (request: Request, response: Response) => {
    try {
        const tasks = db.get('SELECT * FROM tasks')

        console.log(tasks.each)

        return response.status(200).json({ tasks })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});


app.put('/tasks/:id', (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name } = request.body

        const task = tasks.find((item) => item.id === id)

        if (typeof task === 'undefined') {
            return response.status(404).json({ message: "Tarefa não encontrada" })
        }

        task.name = name

        return response.status(200).json({ message: "Tarefa editada com sucesso" })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});


app.delete('/tasks/:id', (request: Request, response: Response) => {
    try {
        const { id } = request.params
        tasks = tasks.filter((item) => item.id !== id)
        return response.status(200).json({ message: "Tarefa excluída com sucesso!" })
    } catch (error) {
        return response.status(500).json({ message: "Houve um erro inesperado" })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});