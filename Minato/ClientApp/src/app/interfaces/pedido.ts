import { Endereco } from "./endereco";
import { Produto } from "./produto";
import { Usuario } from "./usuario";

export interface Pedido {
  id?: number;
  enderecoSelecionado: Endereco;
  produtos: Produto[];
  usuario: Usuario;
  dataPedido?: Date;
  observacao: string;
  pedidoDelivery: boolean;
  pedidoRetirada: boolean;
  pedidoLocal: boolean;
}
