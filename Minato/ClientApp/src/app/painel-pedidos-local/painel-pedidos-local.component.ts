import { Component, OnInit } from '@angular/core';
import { TipoPedido } from '../enums/tipo-pedido';

@Component({
  selector: 'app-painel-pedidos-local',
  templateUrl: './painel-pedidos-local.component.html',
  styleUrls: ['./painel-pedidos-local.component.css']
})
export class PainelPedidosLocalComponent implements OnInit {

  titulo: string = 'Locais';
  displayedColumns: string[] = ['dataPedido', 'observacao', 'mesa', 'actions'];
  tipoPedido: TipoPedido = TipoPedido.local;

  constructor() { }

  ngOnInit(): void {
  }
}
