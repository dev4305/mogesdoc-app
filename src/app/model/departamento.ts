import { Pais } from "./pais";

export class Departamento {
    id!: number;
    codigo!: String;
    nombre!: String;
    estado!: String;
    //pais!: number;
    pais!: Pais;
}