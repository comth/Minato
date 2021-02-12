import { Pedido } from "./pedido";
import { Status } from "./status";

export interface Mesa {
  id: string;
  numero: number;
  status: Status;
  pedido: Pedido;
}
