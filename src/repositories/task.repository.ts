import { Database } from "sqlite3";
import { Task } from "../models/Task";

export class TaskRepository {

    public db: Database

    constructor(db: Database) {
        this.db = db
    }

    public insert = (task: Task) => {
        try {
            const sql = 'INSERT INTO tasks (id, name) VALUES (?, ?)'
            const params = [task.id, task.name]

            this.db.run(sql, params)
        } catch (error) {
            console.error("Houve um erro ao inserir o dado")
        }
    }

    public findAll = async (): Promise<Task[] | undefined> => {
        try {
            const query = this.db.prepare("SELECT * FROM tasks");

            return new Promise((resolve, reject) => {
                let objs = [] as Task[];

                query.all((err, rows) => {

                    for (const row of rows as Task[]) {
                        objs.push(
                            {
                                id: row.id,
                                name: row.name
                            } as Task
                        );
                    }
        
                    resolve(objs);
                })
            })

        } catch (error) {
            console.error("Houve um erro ao listar todos os dados")
        }
    }

    public findOne = async (id: string): Promise<Task | undefined> => {
        try {
            const sql = 'SELECT * FROM tasks WHERE id = ?'
            const params = [id]

            const query = this.db.prepare(sql, params);

            return new Promise((resolve, reject) => {
                let obj = {} as Task;

                query.all((err, rows: Task[]) => {
                    console.log(typeof rows)
                    if (typeof rows[0] !== 'undefined') {
                        obj.id = rows[0].id
                        obj.name = rows[0].name

                        resolve(obj);
                    }

                    resolve(undefined);    
                })
            })
        } catch (error) {
            console.error("Houve um erro a procurar o respectivo dado")
        }
    }

    public update = (task: Task) => {
        try {
            const sql = 'UPDATE tasks SET name = ? WHERE id = ?'
            const params = [task.name, task.id]

            this.db.run(sql, params)
        } catch (error) {
            console.error("Houve um erro ao atualizar")
        }
    }

    public delete = (id: string) => {
        try {
            const sql = 'DELETE FROM tasks WHERE id = ?'
            const params = [id]

            this.db.run(sql, params)
        } catch (error) {
            console.error("Houve um erro ao deletar")
        }
    }
}