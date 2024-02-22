import { Medicamento } from "../model/Medicamento";

export class MedicamentoDTO {

    constructor(
        public id: number,
        public nomeMedicamento: string,
        public inicioTratamento: string,
        public terminoTratamento: string,
        public intervaloTempo: string,
    ) { }


    static fromModel(medicamento: Medicamento): MedicamentoDTO {
        const medicamentoDTO = new MedicamentoDTO(
        medicamento.id,
        medicamento.nomeMedicamento,
        medicamento.inicioTratamento,
        medicamento.terminoTratamento,
        medicamento.intervaloTempo
        );
        
        return medicamentoDTO;
    }

    toModel(): Medicamento {
        let newMedicamento = new Medicamento();
        newMedicamento.nomeMedicamento = this.nomeMedicamento;
        newMedicamento.inicioTratamento = this.inicioTratamento;
        newMedicamento.terminoTratamento = this.terminoTratamento;
        newMedicamento.intervaloTempo = this.intervaloTempo;
        return newMedicamento;

    }

}