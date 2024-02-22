import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/User"
import { Vacina } from "./model/Vacina"
import { Medicamento } from "./model/Medicamento"
import { Patologia } from "./model/Patologia"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "djow3399",
    database: "registro-saude",
    synchronize: true,
    logging: false,
    entities: [User, Vacina, Medicamento, Patologia],
    migrations: [],
    subscribers: [],
})
