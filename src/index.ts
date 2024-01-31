import { AppDataSource } from "./data-source"
import express, {Request, Response} from 'express';
import { User } from "./model/User"
import { UserController } from "./controller/UserController";

const SERVER_PORT = 3000;
const server = express();
server.use(express.json());

AppDataSource.initialize().then(async () => {

    console.log("Banco de dados inicializado");

    server.listen(SERVER_PORT, () => {
        console.log(`Servidor executando na porta ${SERVER_PORT}`);
        
    });

    server.post("/user", async(request: Request, response: Response ) => {
        const userController = new UserController();
        const user = await userController.createUser(
            request.body.nome,
            request.body.email,
            request.body.cpf,
            request.body.senha
        );
        return response.status(201).json(user);
        
    })
    



}).catch(error => console.log(error))


    // console.log("Inserindo usuário ao banco de dados")
    // const user = new User()
    // user.nome = "Timber"
    // user.email = "Saw@teste.com"
    // user.cpf = 11122233344
    // user.senha = "teste123"
    // user.date =
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")
