import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MesaService } from '../services/mesa.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  idMesa: number;
  idPedido: number;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private mesaService: MesaService,
  ) {
    this.route.params.subscribe(params => {
      this.idMesa = params['idMesa'];
    });
  }

  ngOnInit(): void {
    console.log(this.idMesa)
    this.getPedido();
  }

  getPedido() {

  }
}
