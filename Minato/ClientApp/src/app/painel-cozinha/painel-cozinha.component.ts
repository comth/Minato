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

  usuarioForm = new FormControl();
  produtos: ProdutoPedido[] = [];
  pedidos: Pedido[] = [];
  produtosFiltrados: Observable<string[]>;
  usuariosFiltrados: Observable<string[]>;
  idMesa: number;
  numMesa: number;
  hasPedido: boolean;
  displayedColumnsProdutos: string[] = ['produto', 'quantidade', 'observacao', 'actions'];
  dataSourceProdutos: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean = false;
  oldExpandedElement: any;
  produtoPedidoForm: FormGroup;
  expandido: boolean;
  pedidoDelivery: boolean = false;
  oldIdEnderecoSelecionado: number;
  precoProdutos: number = 0;
  precoPorcentGar: number = 0;
  pedido: Pedido = { precoEntrega: 0, preco: 0, enderecoSelecionado: { id: null } };
  idEnderecoSelecionado: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private configuracaoService: ConfiguracaoService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getPedidos();
    this.getProdutos();

    this.initializeMatTable([]);
    this.initializeForm();
    this.subscribesProdutoPedidoForm();
    this.initializeAutoCompleteProduto();
  }

  getPedidos() {
    this.pedidoService.getAll().subscribe((res: any) => {
      this.pedidos = res;
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

  ngDoCheck(): void {
    this.tratarExpansaoTabela();
  }

  changeToggle() {
    if (this.pedidoDelivery) this.pedido.tipoPedido = TipoPedido.delivery;
    else {
      Swal.fire({
        title: 'Deseja mudar o tipo de pedido para Take Away?',
        showCancelButton: true,
        confirmButtonText: `Mudar`,
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.pedido.tipoPedido = TipoPedido.takeAway;
          this.pedido.preco = this.pedido.preco - this.pedido.precoEntrega;
          this.pedido.precoEntrega = 0;
        } else {
          this.pedidoDelivery = true;
        }
      })
    }
  }

  get TipoPedido(): typeof TipoPedido {
    return TipoPedido;
  }

  subscribesProdutoPedidoForm() {
    this.produtoPedidoForm.valueChanges.subscribe((data: any) => {
      this.dataSourceProdutos.data = this.tratarPreco(this.dataSourceProdutos.data);
    });
  }

  initializeMatTable(data) {
    this.dataSourceProdutos = new MatTableDataSource(data);
    this.dataSourceProdutos.paginator = this.paginator;
    this.dataSourceProdutos.sort = this.sort;
    this.dataSourceProdutos.filterPredicate =
      (data: ProdutoPedido, filter: string) => this.customFilter(data, filter);
  }

  customFilter(data: ProdutoPedido, filter: string): boolean {
    if (data.produto.nome.toLowerCase().includes(filter) || data.produto.id.toString().includes(filter)) return true;
    return false;
  }

  tratarExpansaoTabela() {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.oldExpandedElement) {
        this.oldExpandedElement = this.expandedElement;
        this.produtoPedidoForm.patchValue(this.expandedElement);
      }
    }
  }

  getProdutos() {
    this.produtoService.getAll().subscribe((res: any) => {
      this.produtos = res;
    });
  }

  imprimirConta() {
    console.log(this.pedido);
  }

  getPedido() {
    this.pedidoService.get(this.pedido.id).subscribe((res: any) => {
      this.hasPedido = res != null ? true : false;
      if (this.hasPedido) {
        this.pedido = res;
        if (this.pedido.tipoPedido == TipoPedido.delivery) {
          this.pedidoDelivery = true;
          this.idEnderecoSelecionado = this.pedido.enderecoSelecionado.id;
          this.oldIdEnderecoSelecionado = this.pedido.enderecoSelecionado.id;
        }
        this.initializeMatTable(this.pedido.produtos);
        this.dataSourceProdutos.data = this.tratarPreco(this.pedido.produtos);
        this.usuarioForm.patchValue(this.pedido.usuario);
        this.cdRef.detectChanges();
      }
    }, err => console.log(err));
  }

  tratarPreco(produtos: ProdutoPedido[]): ProdutoPedido[] {
    let precoProdutos = 0;
    produtos.forEach(x => {
      if (x.produto) {
        let preco = 0;
        if (this.pedido.tipoPedido == TipoPedido.takeAway || this.pedido.tipoPedido == TipoPedido.delivery) {
          preco = <number>(x.produto.preco + x.produto.embalagem?.preco) * x.quantidade;
        } else {
          preco = <number>x.produto.preco * x.quantidade;
        }
        x.preco = preco;
        precoProdutos = precoProdutos + preco;
      }
    });

    this.precoProdutos = precoProdutos;
    this.pedido.preco = precoProdutos + this.pedido.precoEntrega;

    if (this.configuracaoService.configuracao.cobrarPorcentGar && this.pedido.tipoPedido == TipoPedido.local) {
      this.precoPorcentGar = this.pedido.preco * (this.configuracaoService.configuracao.porcentGar / 100);
      this.pedido.preco = this.pedido.preco + this.precoPorcentGar;
    }

    this.cdRef.detectChanges();
    return produtos;
  }

  initializeForm() {
    this.produtoPedidoForm = this.fb.group({
      id: new FormControl(null),
      produto: new FormControl(null, [Validators.required]),
      quantidade: new FormControl(1, [Validators.required]),
      observacao: new FormControl(null),
      preco: new FormControl(null),
    }, { updateOn: 'change' });

  }

  initializeAutoCompleteProduto() {
    this.produtosFiltrados =
      this.produtoPedidoForm.valueChanges.pipe(
        startWith(''),
        map(value => this.filterProduto(value))
      );
  }

  error() {
    console.log(this.produtoPedidoForm.value)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSourceProdutos.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.produtoPedidoForm.get('id').value) {
          this.dataSourceProdutos.data.splice(index, 1);
          this.dataSourceProdutos.data = this.dataSourceProdutos.data;
          this.produtoPedidoForm.reset();
        }
      });
    }
    else {
      this.expandedElement = null;
      this.produtoPedidoForm.reset();
    }
  }

  onSubmit() {
    if (this.hasPedido) {
      this.put();
    }
    else {
      this.post();
    }
  }

  onSubmitProdutoPedido(row) {
    if (this.editando) {
      this.addProdutoPedido();
    }
    else {
      this.putProdutoPedido(row);
    }
  }

  putProdutoPedido(row) {
    this.expandedElement = null;
    let indice = this.dataSourceProdutos.data.indexOf(row);
    this.dataSourceProdutos.data[indice] =
    {
      id: this.produtoPedidoForm.value.id,
      produto: this.produtoPedidoForm.value.produto,
      quantidade: this.produtoPedidoForm.value.quantidade,
      observacao: this.produtoPedidoForm.value.observacao
    };
    this.dataSourceProdutos.data = this.dataSourceProdutos.data;
    this.produtoPedidoForm.reset();
  }

  put() {
    this.montarPedido(false);
    console.log(this.pedido);
    if (this.isValid()) {
      this.pedidoService.put(this.pedido).subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Salvo!',
          showConfirmButton: false,
          timer: 1500
        });
        this.produtoPedidoForm.reset();
        this.getProdutos();
      }, err => console.log(err));
    }
  }

  addProdutoPedido() {
    this.editando = false;
    this.expandedElement = null;
    this.dataSourceProdutos.data[0] =
    {
      id: 'onlyFront', //adicionado somente no front
      produto: this.produtoPedidoForm.value.produto,
      quantidade: this.produtoPedidoForm.value.quantidade,
      observacao: this.produtoPedidoForm.value.observacao
    };
    this.dataSourceProdutos.data = this.dataSourceProdutos.data;
    this.initializeMatTable(this.dataSourceProdutos.data);
    this.produtoPedidoForm.reset();
  }

  post() {
    this.montarPedido(false);
    console.log(this.pedido);
    if (this.isValid()) {
      this.pedidoService.post(this.pedido, this.idMesa).subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Salvo!',
          showConfirmButton: false,
          timer: 1500
        });
        this.produtoPedidoForm.reset();
        this.pedido.id = res.id;
        this.getPedido();
      }, err => {
        console.log(err);
      });
    }
  }

  isValid(): boolean {
    let tipoPedido: TipoPedido = this.pedido.tipoPedido;
    let usuario: Usuario = this.pedido.usuario;

    if (tipoPedido == TipoPedido.delivery && !this.pedido.enderecoSelecionado) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'É necessário selecionar um endereço para a entrega!',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if ((tipoPedido == TipoPedido.delivery || tipoPedido == TipoPedido.takeAway) && !usuario) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'É necessário selecionar um usuário!',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    } else return true;
  }

  montarPedido(encerrarPedido: boolean) {
    if (this.idEnderecoSelecionado) this.pedido.enderecoSelecionado.id = this.idEnderecoSelecionado;
    if (this.pedido.tipoPedido != TipoPedido.delivery) this.pedido.enderecoSelecionado = null;
    this.pedido.produtos = this.dataSourceProdutos.data;
    this.pedido.pedidoEncerrado = encerrarPedido;
    this.pedido.tipoPedido = +this.pedido.tipoPedido;
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
      title: 'Tem certeza?',
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
        this.dataSourceProdutos.data = this.tratarPreco(this.dataSourceProdutos.data);
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
