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

  displayedColumns: string[] = ['usuario', 'dataPedido', 'observacao', 'preco']; //preço?
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  pedido: Pedido;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.pedidoService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
    if (object2) {
      if (object1.id == object2.id) return true;
      return false;
    }
  }

  cancel() {
    this.expandedElement = null;
  }

  public add() {
    //abrir dialog
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
