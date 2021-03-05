import { Component, OnInit, DoCheck } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmbalagemService } from '../services/embalagem.service';
import Swal from 'sweetalert2';
import { Produto } from '../interfaces/produto';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../interfaces/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-away',
  templateUrl: './take-away.component.html',
  styleUrls: ['./take-away.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TakeAwayComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'dataPedido', 'preco','observacao', 'actions'];
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.pedidoService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getPedidos() {
    this.pedidoService.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  cancel() {
    this.expandedElement = null;
  }

  add() {
    this.router.navigate(['/pedido']) 
  }

  put(pedido: Pedido) {
    this.router.navigate(['/pedido/' + pedido.id]) 
  }

  encerrarPedido(id: number) {
    this.pedidoService.encerrarPedido(id).subscribe((res: any) => {
      console.log(res)
    }, err => console.log(err));
  }

  delete(id: number) {
    this.pedidoService.delete(id).subscribe((res: any) => {
      console.log(res)
    }, err => console.log(err));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
