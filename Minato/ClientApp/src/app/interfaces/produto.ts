import { Embalagem } from "./embalagem";

export interface Produto {
  idBanco: number;
  id: number;
  nome: string;
  preco: number;
  tempoPreparo?: number;
  embalagem: Embalagem;
}


