import { AppDataSource } from "../data-source";
import { MedicamentoDTO } from "../DTO/MedicamentoDTO";
import { Medicamento } from "../model/Medicamento";


export class MedicamentoController {

    async createMedicamento(nomeMedicamento: string, inicioTratamento: string, terminoTratamento: string, intervaloTempo: string, userId: number) {

        const medicamentoRepository = AppDataSource.getRepository(Medicamento);
        const medicamento = new Medicamento();
        medicamento.nomeMedicamento = nomeMedicamento;
        medicamento.inicioTratamento = inicioTratamento;
        medicamento.terminoTratamento = terminoTratamento;
        medicamento.intervaloTempo = intervaloTempo;
        medicamento.userId = userId;

        return await medicamentoRepository.save(medicamento);

    }

    // async getMedicamentos() {
    //     const medicamentoRepository = AppDataSource.getRepository(Medicamento);
    //     const medicamentoList = await medicamentoRepository.find()
    //     return medicamentoList.map((medicamento: Medicamento) => MedicamentoDTO.fromModel(medicamento));

    async getMedicamentosByUserId(userId: number) {
        const medicamentoRepository = AppDataSource.getRepository(Medicamento);
        const medicamentoList = await medicamentoRepository.find({ where: { userId: userId } });
        return medicamentoList.map((medicamento: Medicamento) => MedicamentoDTO.fromModel(medicamento));

    }

}

