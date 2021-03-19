import { Produto } from "./produto";

export interface ProdutoPedido {
  id: number;
  produto: Produto;
  quantidade: number;
  observacao: string;
  preco: number; //onlyFront
}
