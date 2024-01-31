import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "djow3399",
    database: "registro-saude",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
