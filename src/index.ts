import { AppDataSource } from "./data-source"
import express, {Request, Response} from 'express';
import { User } from "./model/User"
import { UserController } from "./controller/UserController";
import { SessionController } from "./controller/SessionController";

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
            request.body.senha,
            request.body.cpf,
        );
        return response.status(201).json(user);
        
    })

    server.get("/users", async (request: Request, response: Response) => {
        const userController = new UserController();
        return response.json(await userController.getUsers());
      });

      server.post("/login", async (request: Request, response: Response) => {
        const sessionController = new SessionController();
        try {
          const token = await sessionController.login(
            request.body.email,
            request.body.senha
          );
          return response.status(200).json({
            token,
          });
        } catch (e) {
          return response.status(400).json({
            error: e.message,
          });
        }
      });
    
}).catch(error => console.log(error))


