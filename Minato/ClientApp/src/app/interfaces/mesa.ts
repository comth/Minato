import { Pedido } from "./pedido";
import { Status } from "./status";

export interface Mesa {
  id: number;
  numero?: number;
  status?: Status;
  pedido?: Pedido;
}
