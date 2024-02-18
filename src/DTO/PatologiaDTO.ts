import { Patologia } from "../model/Patologia";

export class PatologiaDTO {

    constructor(
        public id: number,
        public nomePatologia: string,
       
    ) { }


    static fromModel(patologia: Patologia): PatologiaDTO {
        const patologiaDTO = new PatologiaDTO(
        patologia.id,
        patologia.nomePatologia,
        
        );
        
        return patologiaDTO;
    }

    toModel(): Patologia {
        let newPatologia = new Patologia();
        newPatologia.nomePatologia = this.nomePatologia;
       
        return newPatologia;

    }

}