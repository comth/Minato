import { Endereco } from "./endereco";

export interface Usuario {
  id?: number;
  nome?: string;
  enderecos?: Endereco[];
  telefones?: Telefone[];
}

export interface Telefone {
  id: string;
  value: string;
}
