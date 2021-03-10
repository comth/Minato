import { Component, OnInit } from '@angular/core';
import { TipoPedido } from '../enums/tipo-pedido';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  tipoPedido: TipoPedido;
  titulo: string;

  ngOnInit(): void {
    this.tipoPedido = TipoPedido.delivery;
    this.titulo = 'Delivery';
  }
}
