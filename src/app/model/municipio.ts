import { Departamento } from "./departamento";

export class Municipio {
    id!: number;
    codigo!: String;
    nombre!: String;
    estado!: String;
    departamento!: Departamento;
}