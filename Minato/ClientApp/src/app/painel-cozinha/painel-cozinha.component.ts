import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-cozinha',
  templateUrl: './painel-cozinha.component.html',
  styleUrls: ['./painel-cozinha.component.css']
})
export class PainelCozinhaComponent implements OnInit {

  titulo: string = 'Pedidos';
  displayedColumns: string[] = ['dataPedido', 'observacao', 'mesa', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
