import { Status } from "./status";

export interface Configuracao {
  statusInicioPedido?: Status;
  statusFinalPedido?: Status;
  cepRestaurante?: string;
  nomeExibicao?: string;
  precoPorKm?: number;
  keyDistanceMatrix?: string;
  cobrarPorcentGar?: boolean;
  porcentGar?: number;
  cobrarEntrega?: boolean;
  entregaFixa?: boolean;
  valorEntregaFixa?: number;
}
