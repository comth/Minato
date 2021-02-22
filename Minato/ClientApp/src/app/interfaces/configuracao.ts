import { Status } from "./status";

export interface Configuracao {
  statusInicioPedido: Status;
  statusFinalPedido: Status;
  cepRestaurante?: string;
  nomeExibicao?: string;
  precoPorKm?: string;
  CobrarPorcentGar?: boolean;
  PorcentGar?: number;
}
