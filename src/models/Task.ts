import {v4 as uuidV4} from "uuid"

export class Task {
    public id: string;
    public name: string;

    constructor(
        name: string
    ) {
        this.name = name
        this.id = uuidV4()
    }
}