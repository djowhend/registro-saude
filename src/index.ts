import { AppDataSource } from "./data-source"
import express, { Request, Response } from 'express';
import { User } from "./model/User"
import { UserController } from "./controller/UserController";
import { SessionController } from "./controller/SessionController";
import { VacinaController } from "./controller/VacinaController"
import { MedicamentoController } from "./controller/MedicamentoController";
import { PatologiaController } from "./controller/PatologiaController";
import { AuthenticatedRequest, AuthenticationMiddleware, } from "./middleware/AuthenticationMiddleware";


const SERVER_PORT = 3000;
const server = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const qr = require('qrcode');

server.use(express.json());
server.use(cors());

const upload = multer({ dest: 'uploads/' });

server.post("/user", async (request: Request, response: Response) => {
  const userController = new UserController();
  const user = await userController.createUser(
    request.body.nome,
    request.body.sobrenome,
    request.body.email,
    request.body.senha,
    request.body.cpf,
    request.body.genero,
    request.body.dataNascimento,
    request.body.numTelefone,
    request.body.numTelefoneEmergencia,
    request.body.tipoSanguineo
  );
  return response.status(201).json(user);

})

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



server.use(new AuthenticationMiddleware().validateAuthentication);

server.get("/users", async (request: Request, response: Response) => {
  const userController = new UserController();
  return response.json(await userController.getUsers());
});

server.get("/users/:id", async (request: AuthenticatedRequest, response: Response) => {
  const userController = new UserController();
  const user = await userController.getUserId(
    request.userId
  );
  return response.status(201).json(user);
})

server.get("/vacinas/:id", async (request: AuthenticatedRequest, response: Response) => {
  const userController = new VacinaController();
  const user = await userController.getVacinasByUserId(
    request.userId
  );
  return response.status(201).json(user);
})

// server.put("/users", async (request: AuthenticatedRequest, response: Response) => {
//   const userController = new UserController();
//   const user = await userController.createUser(
//     request.body.nome,
//     request.body.sobrenome,
//     request.body.email,
//     request.body.senha,
//     request.body.cpf,
//     request.body.genero,
//     request.body.dataNascimento,
//     request.body.numTelefone,
//     request.body.numTelefoneEmergencia,
//     request.body.tipoSanguineo
//   );
//   return response.status(201).json(user);

// })


server.patch("/users/:id", upload.single('image'), async (request: AuthenticatedRequest & { file: any }, response: Response) => {
  const imageFile = request.file;
  let fotoPerfil;

  if (imageFile) {
    fotoPerfil = imageFile.originalname;

    // Construct the destination path
    const destinationPath = 'imagensPerfil/' + fotoPerfil;

    if (!fs.existsSync(destinationPath)) {
      fs.renameSync(imageFile.path, destinationPath);
    }
  }


  const userController = new UserController();
  const user = await userController.updateUser(
    request.userId,
    request.body.nome,
    request.body.sobrenome,
    request.body.email,
    request.body.senha,
    request.body.cpf,
    request.body.genero,
    request.body.dataNascimento,
    request.body.numTelefone,
    request.body.numTelefoneEmergencia,
    request.body.tipoSanguineo,
    fotoPerfil
  );
  return response.status(201).json(user);

})

server.post("/vacina", async (request: AuthenticatedRequest, response: Response) => {
  const vacinaController = new VacinaController();
  const vacina = await vacinaController.createVacina(
    request.body.nomeVacina,
    request.body.loteVacina,
    request.body.dataVacinacao,
    request.body.validadeVacina,
    request.userId
  )
  return response.status(201).json(vacina);

})



// server.get("/vacinas", async (request: Request, response: Response) => {
//   const vacinaController = new VacinaController();
//   return response.json(await vacinaController.getVacinas());
// });

server.get("/vacinas", async (request: AuthenticatedRequest, response: Response) => {
  const userId = request.userId
  const vacinaController = new VacinaController();
  return response.json(await vacinaController.getVacinasByUserId(userId));
});

server.post("/medicamento", async (request: AuthenticatedRequest, response: Response) => {
  const medicamentoController = new MedicamentoController();
  const medicamento = await medicamentoController.createMedicamento(
    request.body.nomeMedicamento,
    request.body.inicioTratamento,
    request.body.terminoTratamento,
    request.body.intervaloTempo,
    request.userId
  );
  return response.status(201).json(medicamento);

})

server.get("/medicamentos/:id", async (request: AuthenticatedRequest, response: Response) => {
  const userId = request.userId
  const medicamentoController = new MedicamentoController();
  return response.json(await medicamentoController.getMedicamentosByUserId(userId));
});


server.post("/patologia", async (request: AuthenticatedRequest, response: Response) => {
  const patologiaController = new PatologiaController();
  const patologia = await patologiaController.createPatologia(
    request.body.nomePatologia,
    request.userId

  );
  return response.status(201).json(patologia);

})

server.get("/patologias", async (request: AuthenticatedRequest, response: Response) => {
  const userId = request.userId
  const patologiaController = new PatologiaController();
  return response.json(await patologiaController.getPatologiasByUserId(userId));
});

server.get("/qrCode", async (request: AuthenticatedRequest, response: Response) => {
  const urlWithParams = `http://10.10.206.161:57747/Html/PerfilQrcode.html?userId=${request.userId}`;

  // Generate QR code for the URL with parameters
  qr.toDataURL(urlWithParams, (err, qrDataURL) => {
    if (err) {
      console.error('Error generating QR code:', err);
      response.status(500).send('Error generating QR code');
    } else {
      // Send the QR code data URL in the response
      response.send(`<img src="${qrDataURL}" alt="QR Code" />`);
    }
  });
});


AppDataSource.initialize().then(async () => {

  console.log("Banco de dados inicializado");

  server.listen(SERVER_PORT, () => {
    console.log(`Servidor executando na porta ${SERVER_PORT}`);

  });

}).catch(error => console.log(error))






