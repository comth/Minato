import { TipoPedido } from "../enums/tipo-pedido";
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
  pedidoEncerrado?: boolean;
  preco?: number;
  tipoPedido?: TipoPedido;
  tempoEntrega?: number;
}
