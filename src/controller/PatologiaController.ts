import { AppDataSource } from "../data-source";
import { PatologiaDTO } from "../DTO/PatologiaDTO";
import { Patologia } from "../model/Patologia";


export class PatologiaController {

    async createPatologia(nomePatologia: string) {

        const patologiaRepository = AppDataSource.getRepository(Patologia);
        const patologia = new Patologia();
        patologia.nomePatologia = nomePatologia;
        

        return await patologiaRepository.save(patologia);

    }

    async getPatologias() {
        const patologiaRepository = AppDataSource.getRepository(Patologia);
        const patologiaList = await patologiaRepository.find()
        return patologiaList.map((patologia: Patologia) => PatologiaDTO.fromModel(patologia));

    }

}

//parei no vídeo 9:20