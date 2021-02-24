import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from '../services/produto.service';
import { Usuario } from '../interfaces/usuario';
import { Produto } from '../interfaces/produto';
import { ProdutoPedido } from '../interfaces/produto-pedido';
import { Endereco } from '../interfaces/endereco';
import { Pedido } from '../interfaces/pedido';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { DistanceMatrix } from '../interfaces/distance-matrix';
import { Configuracao } from '../interfaces/configuracao';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PedidoComponent implements OnInit {

  usuarioForm = new FormControl();
  produtos: any[] = [];
  usuarios: Usuario[] = [];
  usuario: Usuario;
  configuracao: Configuracao = {};
  produtosFiltrados: Observable<string[]>;
  usuariosFiltrados: Observable<string[]>;
  idMesa: number;
  numMesa: number;
  entregaCalculada: boolean = false;
  hasPedido: boolean;
  displayedColumns: string[] = ['produto', 'quantidade', 'observacao', 'preco','actions'];
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  produtoPedidoForm: FormGroup;
  produto: Produto;
  produtoPedido: ProdutoPedido;
  pedidoDelivery = false;
  expandido: boolean;
  option: any;
  enderecoSelecionado: Endereco;
  oldEnderecoSelecionado: Endereco;
  enderecos: any[] = [];
  pedidoRetirada: boolean;
  precoProdutos: number;
  precoEntrega: number;
  pedido: Pedido =
    {
      enderecoSelecionado: null,
      produtos: null,
      pedidoDelivery: null,
      pedidoLocal: null,
      pedidoRetirada: null,
      dataPedido: null,
      usuario: null,
      observacao: null
    };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private distanceMatrixService: DistanceMatrixService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => {
      this.idMesa = params['idMesa'];
      if (this.idMesa) {
        this.pedidoDelivery = false;
        this.pedidoRetirada = false;
      } 
      this.numMesa = params['numMesa'];
    });
  }

  ngOnInit(): void {
    this.editando = false;
    this.getProdutos();
    this.getUsuarios();
    this.getConfiguracao();
    if (this.idMesa) {
      this.getPedido(this.idMesa);
    }
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: ProdutoPedido, filter: string) => this.customFilter(data, filter);

    this.initializeForm();
    this.usuarioForm.valueChanges.subscribe((data: any) => {
      this.expandido = false;
    });

    this.produtoPedidoForm.valueChanges.subscribe((data: any) => {
      this.dataSource.data = this.tratarPreco(this.dataSource.data);
    });

    this.initializeAutoCompleteProduto();
    this.initializeAutoCompleteUsuario();
  }

  ngDoCheck(): void {
    this.tratarExpansaoTabela();
    this.tratarRadioButton();
    this.tratarEntrega();
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

  tratarRadioButton() {
    if (this.pedidoDelivery && !this.expandido) {
      this.expandido = true;
      this.updateRadioButton();
    }
  }

  tratarEntrega() {
    if (this.enderecoSelecionado && !this.entregaCalculada) {
      this.oldEnderecoSelecionado = this.enderecoSelecionado;
      this.entregaCalculada = true;
      if (this.enderecoSelecionado.cep) this.calcularEntrega();
    }
  }

  calcularEntrega() {
    this.distanceMatrixService.get(this.enderecoSelecionado.cep).subscribe((res: DistanceMatrix) => {
      this.precoEntrega = res.distance.value * this.configuracao.precoPorKm;
    }, err => console.log(err));
  }

  getConfiguracao() {
    this.configuracao.precoPorKm = 5;
  }

  tratarEndereco() {
    if (this.enderecoSelecionado && this.oldEnderecoSelecionado) {
      if (this.enderecoSelecionado.id != this.oldEnderecoSelecionado.id) {
        this.oldEnderecoSelecionado = this.enderecoSelecionado;
        console.log('Entrou')
        this.entregaCalculada = false;
      }
    }
  }

  getProdutos() {
    this.produtoService.getAll().subscribe((res: any) => {
      this.produtos = res;
    });
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe((res: any) => {
      this.usuarios = res;
    });
  }

  encerrarPedido() {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Não é possível reverter essa operação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Encerrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.pedido = this.montarPedido(true);
      this.pedidoService.put(this.pedido).subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido Encerrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/mesas']);
      }, err => console.log(err));
    });
  }

  imprimirConta() {
    console.log(this.montarPedido(false));
  }

  getPedido(idMesa) {
    this.pedidoService.getByMesa(idMesa).subscribe((res: any) => {
      this.hasPedido = res != null ? true : false;
      if (this.hasPedido) {
        this.pedido = res;
        this.dataSource.data = this.tratarPreco(this.pedido.produtos);

        this.enderecoSelecionado = this.pedido.enderecoSelecionado;
        this.usuario = this.pedido.usuario;
        this.usuarioForm.patchValue(this.pedido.usuario);
        this.pedidoDelivery = this.pedido.pedidoDelivery;
        this.cdRef.detectChanges();
      }
    }, err => console.log(err));
  }

  tratarPreco(produtos: any[]): any[] {
    let precoTotal = 0;
    produtos.forEach(x => {
      if (x.produto) {
        let preco = x.produto.preco * x.quantidade;
        x.preco = preco;
        precoTotal = precoTotal + preco;
      }
    });

    this.precoProdutos = precoTotal;
    return produtos;
  }

  updateRadioButton() {
    this.usuarios.forEach(usuario => {
      if (usuario.id == this.usuarioForm.value.id) {
        this.usuario = usuario;
        this.enderecos = usuario.enderecos;
      }
    });
  }

  initializeForm() {
    this.produtoPedidoForm = this.fb.group({
      id: new FormControl(null),
      produto: new FormControl(null, [Validators.required]),
      quantidade: new FormControl(1, [Validators.required]),
      observacao: new FormControl(null),
    }, { updateOn: 'change' });
  }

  initializeAutoCompleteProduto() {
    this.produtosFiltrados =
      this.produtoPedidoForm.valueChanges.pipe(
        startWith(''),
        map(value => this.filterProduto(value))
      );
  }

  initializeAutoCompleteUsuario() {
    this.usuariosFiltrados =
      this.usuarioForm.valueChanges.pipe(
        startWith(''),
        map(value => this.filterUsuario(value))
      );
  }

  error() {
    console.log(this.produtoPedidoForm.value)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSource.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.produtoPedidoForm.get('id').value) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
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
    let indice = this.dataSource.data.indexOf(row);
    this.dataSource.data[indice] =
    {
      id: this.produtoPedidoForm.value.id,
      produto: this.produtoPedidoForm.value.produto,
      quantidade: this.produtoPedidoForm.value.quantidade,
      observacao: this.produtoPedidoForm.value.observacao
    };
    this.dataSource.data = this.dataSource.data;
    this.produtoPedidoForm.reset();
  }

  put() {
    this.pedido = this.montarPedido(false);
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

  addProdutoPedido() {
    this.editando = false;
    this.expandedElement = null;
    this.dataSource.data[0] =
    {
      id: 'onlyFront', //adicionado somente no front
      produto: this.produtoPedidoForm.value.produto,
      quantidade: this.produtoPedidoForm.value.quantidade,
      observacao: this.produtoPedidoForm.value.observacao
    };
    this.dataSource.data = this.dataSource.data;
    this.produtoPedidoForm.reset();
  }

  post() {
    this.pedido = this.montarPedido(false);
    this.pedidoService.post(this.pedido, this.idMesa).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.produtoPedidoForm.reset();
    }, err => {
      console.log(err);
    });
  }

  montarPedido(encerrarPedido: boolean): Pedido {
    let pedido: Pedido = {
      id: this.pedido?.id,
      enderecoSelecionado: this.enderecoSelecionado,
      pedidoLocal: !this.pedidoDelivery,
      produtos: this.dataSource.data,
      usuario: this.usuario,
      pedidoDelivery: this.pedidoDelivery,
      pedidoRetirada: this.pedidoRetirada,
      observacao: this.pedido.observacao,
      pedidoEncerrado: encerrarPedido,
    }
    return pedido;
  }

  add() {
    if (!this.editando) {
      let produtoPedido = { id: 0, produto: null, quantidade: 1, observacao: "" };
      this.dataSource.data = [produtoPedido].concat(this.dataSource.data);
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
        let indice = this.dataSource.data.indexOf(row);
        this.dataSource.data.splice(indice, 1);
        this.dataSource.data = this.tratarPreco(this.dataSource.data);
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
      option.nome.toLowerCase().includes(filterValue) || option.id.toString().includes(filterValue)
    );;
  }

  private filterUsuario(value: any): any[] {
    let filterValue = '';
    if (value?.nome) {
      filterValue = value?.nome.toLowerCase();
    } else if (value) {
      filterValue = value.toLowerCase();
    }

    return this.usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(filterValue) || usuario.telefones.filter(x => x.value.includes(filterValue)).length != 0 
    );;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
