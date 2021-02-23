import { Status } from "./status";

export interface Configuracao {
  statusInicioPedido: Status;
  statusFinalPedido: Status;
  cepRestaurante?: string;
  nomeExibicao?: string;
  precoPorKm?: string;
  keyDistanceMatrix?: string;
  cobrarPorcentGar?: boolean;
  porcentGar?: number;
}
