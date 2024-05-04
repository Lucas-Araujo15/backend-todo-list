import { Database } from "sqlite3";


export function createDbConnection() {
    const db = new Database('database/todo_list.db');
    console.log("Connection with SQLite has been established");


    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS tasks (id TEXT, name TEXT)');
    });
      
      
    return db;
}

