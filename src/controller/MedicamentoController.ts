import { AppDataSource } from "../data-source";
import { MedicamentoDTO } from "../DTO/MedicamentoDTO";
import { Medicamento } from "../model/Medicamento";


export class MedicamentoController {

    async createMedicamento(nomeMedicamento: string, inicioTratamento: string, terminoTratamento: string, intervaloTempo: string) {

        const medicamentoRepository = AppDataSource.getRepository(Medicamento);
        const medicamento = new Medicamento();
        medicamento.nomeMedicamento = nomeMedicamento;
        medicamento.inicioTratamento = inicioTratamento;
        medicamento.terminoTratamento = terminoTratamento;
        medicamento.intervaloTempo = intervaloTempo;

        return await medicamentoRepository.save(medicamento);

    }

    async getMedicamentos() {
        const medicamentoRepository = AppDataSource.getRepository(Medicamento);
        const medicamentoList = await medicamentoRepository.find()
        return medicamentoList.map((medicamento: Medicamento) => MedicamentoDTO.fromModel(medicamento));

    }

}

//parei no vídeo 9:20