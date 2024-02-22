import { Vacina } from "../model/Vacina";

export class VacinaDTO {

    constructor(
        public id: number,
        public nomeVacina: string,
        public loteVacina: string,
        public dataVacinacao: string,
        public validadeVacina: string,
    ) { }


    static fromModel(vacina: Vacina): VacinaDTO {
        const vacinaDTO = new VacinaDTO(
        vacina.id,
        vacina.nomeVacina,
        vacina.loteVacina,
        vacina.dataVacinacao,
        vacina.validadeVacina
        );
        
        return vacinaDTO;
    }

    toModel(): Vacina {
        let newVacina = new Vacina();
        newVacina.nomeVacina = this.nomeVacina;
        newVacina.loteVacina = this.loteVacina;
        newVacina.dataVacinacao = this.dataVacinacao;
        newVacina.validadeVacina = this.validadeVacina;
        return newVacina;

    }

}