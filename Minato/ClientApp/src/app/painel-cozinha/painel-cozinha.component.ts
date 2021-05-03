import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from '../services/produto.service';
import { Usuario } from '../interfaces/usuario';
import { Produto } from '../interfaces/produto';
import { TipoPedido } from '../enums/tipo-pedido';
import { ProdutoPedido } from '../interfaces/produto-pedido';
import { Pedido } from '../interfaces/pedido';
import { ConfiguracaoService } from '../services/configuracao.service';

@Component({
  selector: 'app-painel-cozinha',
  templateUrl: './painel-cozinha.component.html',
  styleUrls: ['./painel-cozinha.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PainelCozinhaComponent implements OnInit {

  produtos: ProdutoPedido[] = [];
  pedidos: Pedido[] = [];
  produtosFiltrados: Observable<string[]>;
  usuariosFiltrados: Observable<string[]>;
  displayedColumnsProdutos: string[] = ['produto', 'quantidade', 'observacao', 'actions'];
  displayedColumnsPedidos: string[] = ['id', 'dataPedido', 'observacao', 'actions'];
  dataSourceProdutos: MatTableDataSource<ProdutoPedido>;
  dataSourcePedidos: MatTableDataSource<Pedido>;
  expandedElement: any | null;
  editando: boolean = false;
  oldExpandedElement: any;
  expandido: boolean;
  pedidoSelecionado: Pedido;

  @ViewChild(MatPaginator) paginatorProdutos: MatPaginator;
  @ViewChild(MatPaginator) paginatorPedidos: MatPaginator;
  @ViewChild(MatSort) sortProdutos: MatSort;
  @ViewChild(MatSort) sortPedidos: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getPedidos();
    this.getProdutos();
    this.initializeMatTableProdutos([]);
  }

  getPedidos() {
    this.pedidoService.getAll().subscribe((res: any) => {
      this.pedidos = res;
      this.initializeMatTablePedidos(res);
      this.tratarPedidos();
    }, err => console.log(err));
  }

  tratarPedidos() {
    this.pedidos.forEach(pedido => {
      pedido.produtos.forEach(produtoPedido => {
        this.produtos.push(produtoPedido);
        this.dataSourceProdutos.data.push(produtoPedido);
      });
    });
    this.dataSourceProdutos.data = this.dataSourceProdutos.data;
    console.log(this.dataSourceProdutos.data);
  }

  showSelected(event) {
    this.pedidoSelecionado = event;
    console.log(event);
  }

  ngDoCheck(): void {
    this.tratarExpansaoTabela();
  }

  get TipoPedido(): typeof TipoPedido {
    return TipoPedido;
  }

  initializeMatTableProdutos(data) {
    this.dataSourceProdutos = new MatTableDataSource(data);
    this.dataSourceProdutos.paginator = this.paginatorProdutos;
    this.dataSourceProdutos.sort = this.sortProdutos;
    this.dataSourceProdutos.filterPredicate =
      (data: ProdutoPedido, filter: string) => this.customFilter(data, filter);
  }

  initializeMatTablePedidos(data) {
    this.dataSourcePedidos = new MatTableDataSource(data);
    this.dataSourcePedidos.paginator = this.paginatorPedidos;
    this.dataSourcePedidos.sort = this.sortPedidos;
  }

  customFilter(data: ProdutoPedido, filter: string): boolean {
    if (data.produto.nome.toLowerCase().includes(filter) || data.produto.id.toString().includes(filter)) return true;
    return false;
  }

  tratarExpansaoTabela() {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.oldExpandedElement) {
        this.oldExpandedElement = this.expandedElement;
      }
    }
  }

  getProdutos() {
    this.produtoService.getAll().subscribe((res: any) => {
      this.produtos = res;
    });
  }

  add() {
    if (!this.editando) {
      let produtoPedido = { id: 0, produto: null, quantidade: 1, observacao: "" };
      this.dataSourceProdutos.data = [produtoPedido].concat(this.dataSourceProdutos.data);
      this.expandedElement = produtoPedido;
      this.editando = true;
    }
  }

  delete(row: any) {
    this.expandedElement = null;
    Swal.fire({
      title: 'Produto Finalizado?',
      text: "Não é possível reverter essa operação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.dataSourceProdutos.data.indexOf(row);
        this.dataSourceProdutos.data.splice(indice, 1);
        
      };
      this.expandedElement = null;
    })
  }

  displayFn(object: any): string {
    return object && object.nome ? object.nome : '';
  }

  private filterProduto(value: any): any[] {
    let filterValue = '';
    if (value.produto?.nome) {
      filterValue = value.produto.nome.toLowerCase();
    } else if (value.produto) {
      filterValue = value.produto.toLowerCase();
    }
    return this.produtos.filter(option =>
      option.produto?.nome.toLowerCase().includes(filterValue) || option.produto?.id.toString().includes(filterValue)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProdutos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProdutos.paginator) {
      this.dataSourceProdutos.paginator.firstPage();
    }
  }
}
