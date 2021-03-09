import { Component, OnInit, DoCheck, ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../interfaces/pedido';
import { Router } from '@angular/router';
import { TipoPedido } from '../enums/tipo-pedido';

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

  displayedColumns: string[] = ['usuario', 'dataPedido', 'preco', 'observacao', 'actions'];
  dataSource: MatTableDataSource<Pedido>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  mostrarFechados: boolean = false; //only

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getPedidos();
    
  }

  customFilter(data: Pedido, filter: string): boolean {
    if (data.usuario.nome.toLowerCase().includes(filter)) return true;

    let filtrados: any[] = data.usuario.telefones.filter(x => x.value.includes(filter));
    if (filtrados.length != 0) return true;
    return false;
  }

  getPedidos() {
    this.pedidoService.getEspecifico(TipoPedido.takeAway, this.mostrarFechados).subscribe((res: Pedido[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate =
        (data: Pedido, filter: string) => this.customFilter(data, filter);
    });
  }

  cancel() {
    this.expandedElement = null;
  }

  add() {
    this.router.navigate(['/pedido/' + TipoPedido.takeAway]) 
  }

  onChangeToggle() {
    this.getPedidos();
  }

  put(pedido: Pedido) {
    this.router.navigate(['/pedido/' + TipoPedido.takeAway + '/' + pedido.id]) 
  }

  encerrarPedido(id: number) {
    this.pedidoService.encerrarPedido(id).subscribe((res: any) => {
      this.getPedidos();
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
