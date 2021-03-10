import { Component, OnInit } from '@angular/core';
import { TipoPedido } from '../enums/tipo-pedido';

@Component({
  selector: 'app-take-away',
  templateUrl: './take-away.component.html',
  styleUrls: ['./take-away.component.css'],
})

export class TakeAwayComponent implements OnInit {

  tipoPedido: TipoPedido;
  titulo: string;

  ngOnInit(): void {
    this.tipoPedido = TipoPedido.takeAway;
    this.titulo = 'Take Away';
  }
}
