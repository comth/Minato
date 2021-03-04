import { Endereco } from "./endereco";
import { ProdutoPedido } from "./produto-pedido";
import { Usuario } from "./usuario";

export interface Pedido {
  id?: number;
  enderecoSelecionado?: Endereco;
  produtos?: ProdutoPedido[];
  usuario?: Usuario;
  dataPedido?: Date;
  precoEntrega?: number;
  observacao?: string;
  pedidoDelivery?: boolean;
  pedidoRetirada?: boolean;
  pedidoLocal?: boolean;
  pedidoEncerrado?: boolean;
  preco?: number;
}
