import { Produto } from "./produto";

export interface ProdutoPedido {
  id: any;
  produto: Produto;
  quantidade: number;
  observacao: string;
  preco?: number; //onlyFront
}
