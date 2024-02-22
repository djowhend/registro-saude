import { AppDataSource } from "../data-source";
import { VacinaDTO } from "../DTO/VacinaDTO";
import { Vacina } from "../model/Vacina";


export class VacinaController {

    async createVacina(nomeVacina: string, loteVacina: string, dataVacinacao: string, validadeVacina: string, userId: number) {

        const vacinaRepository = AppDataSource.getRepository(Vacina);
        const vacina = new Vacina();
        vacina.nomeVacina = nomeVacina;
        vacina.loteVacina = loteVacina;
        vacina.dataVacinacao = dataVacinacao;
        vacina.validadeVacina = validadeVacina;
        vacina.userId = userId

        return await vacinaRepository.save(vacina);

    }

    // async getVacinas() {
    //     const vacinaRepository = AppDataSource.getRepository(Vacina);
    //     const vacinaList = await vacinaRepository.find()
    //     return vacinaList.map((vacina: Vacina) => VacinaDTO.fromModel(vacina));

    // }

    async getVacinasByUserId(userId: number) {
        const vacinaRepository = AppDataSource.getRepository(Vacina);
        const vacinaList = await vacinaRepository.find({ where: { userId: userId } });
        return vacinaList.map((vacina: Vacina) => VacinaDTO.fromModel(vacina));
    }

}

