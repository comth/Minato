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
import { TipoPedido } from '../enums/tipo-pedido';
import { ProdutoPedido } from '../interfaces/produto-pedido';
import { Endereco } from '../interfaces/endereco';
import { Pedido } from '../interfaces/pedido';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { DistanceMatrix } from '../interfaces/distance-matrix';
import { Configuracao } from '../interfaces/configuracao';
import { ConfiguracaoService } from '../services/configuracao.service';
import { RouterExtService } from '../services/router-ext-service.service';


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
  produtos: Produto[] = [];
  usuarios: Usuario[] = [];
  produtosFiltrados: Observable<string[]>;
  usuariosFiltrados: Observable<string[]>;
  idMesa: number;
  numMesa: number;
  entregaCalculada: boolean = false;
  hasPedido: boolean;
  displayedColumns: string[] = ['produto', 'quantidade', 'observacao', 'preco','actions'];
  dataSource: MatTableDataSource<any>;
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
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private configuracaoService: ConfiguracaoService,
    private distanceMatrixService: DistanceMatrixService,
    private routerExtService: RouterExtService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => {
      this.pedido.tipoPedido = <TipoPedido>params['tipoPedido'];
      this.idMesa = params['idMesa'];
      this.pedido.id = params['idPedido'];
      this.numMesa = params['numMesa'];
    });
  }

  ngOnInit(): void {
    this.getProdutos();

    if (this.pedido.id) {
      this.getPedido();
    } else {
      this.hasPedido = false;
      if (this.pedido.tipoPedido == TipoPedido.delivery) {
        this.pedidoDelivery = true;
      }
      //this.identificarTipoPedido();
    } 

    if (!this.idMesa) {
      this.getUsuarios();
      this.subscribesUsuarioForm();
      this.initializeAutoCompleteUsuario();
    }
    this.initializeMatTable([]);
    this.initializeForm();
    this.subscribesProdutoPedidoForm();
    this.initializeAutoCompleteProduto();
  }

  ngDoCheck(): void {
    this.tratarExpansaoTabela();
    this.tratarRadioButton();
    this.tratarEntrega();
  }

  subscribesUsuarioForm() {
    this.usuarioForm.valueChanges.subscribe((data: any) => {
      this.expandido = false;
      if (data) {
        if (data.id) {
          this.pedido.usuario = data;
        }
      }
      this.cdRef.detectChanges();
    });
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
      this.dataSource.data = this.tratarPreco(this.dataSource.data);
    });
  }

  initializeMatTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
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

  tratarRadioButton() {
    if (this.pedido.tipoPedido == TipoPedido.delivery && !this.expandido) {
      this.expandido = true;
      this.updateRadioButton();
    }
  }

  tratarEntrega() {
    if (this.pedido.enderecoSelecionado && !this.entregaCalculada && this.pedido.tipoPedido == TipoPedido.delivery) {
      this.oldIdEnderecoSelecionado = this.idEnderecoSelecionado;
      if (this.pedido.enderecoSelecionado.cep) this.calcularEntrega();
    }
  }

  calcularEntrega() {
    console.log('Cálculo entrega')
    this.entregaCalculada = true;
    this.pedido.precoEntrega = 23.954;
    //this.distanceMatrixService.get(this.pedido.enderecoSelecionado.cep).subscribe((res: DistanceMatrix) => {
    //  console.log(res.distance);
    //  this.pedido.precoEntrega = res.distance.value * (this.configuracaoService.configuracao.precoPorKm / 1000);
    //}, err => console.log(err));
  }

  tratarEndereco() {

    if (this.idEnderecoSelecionado && this.oldIdEnderecoSelecionado) {
      console.log(this.oldIdEnderecoSelecionado)
      console.log(this.idEnderecoSelecionado)
      if (this.idEnderecoSelecionado != this.oldIdEnderecoSelecionado) {
        this.oldIdEnderecoSelecionado = this.idEnderecoSelecionado;
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
      this.pedido.pedidoEncerrado = true;
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
    console.log(this.pedido);
  }

  getPedido() {
    this.pedidoService.get(this.pedido.id).subscribe((res: any) => {
      this.hasPedido = res != null ? true : false;
      if (this.hasPedido) {
        this.entregaCalculada = true;
        this.pedido = res;
        if (this.pedido.tipoPedido == TipoPedido.delivery) {
          this.pedidoDelivery = true;
          this.idEnderecoSelecionado = this.pedido.enderecoSelecionado.id;
        } 
        this.initializeMatTable(this.pedido.produtos);
        this.oldIdEnderecoSelecionado = this.pedido.enderecoSelecionado.id;
        this.dataSource.data = this.tratarPreco(this.pedido.produtos);
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
          preco = <number> x.produto.preco * x.quantidade;
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

  updateRadioButton() {
    this.usuarios.forEach(usuario => {
      if (usuario.id == this.usuarioForm.value.id) {
        this.pedido.usuario = usuario;
        this.pedido.enderecoSelecionado.id = null;
      }
    });
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
    this.dataSource.data[0] =
    {
      id: 'onlyFront', //adicionado somente no front
      produto: this.produtoPedidoForm.value.produto,
      quantidade: this.produtoPedidoForm.value.quantidade,
      observacao: this.produtoPedidoForm.value.observacao
    };
    this.dataSource.data = this.dataSource.data;
    this.initializeMatTable(this.dataSource.data);
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
    if (!this.pedido.enderecoSelecionado.id) this.pedido.enderecoSelecionado = null;
    this.pedido.produtos = this.dataSource.data;
    this.pedido.pedidoEncerrado = encerrarPedido;
    this.pedido.tipoPedido = +this.pedido.tipoPedido;
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

  //identificarTipoPedido() {
  //  if (this.idMesa) {
  //    this.pedido.tipoPedido = TipoPedido.local;
  //  } else {
  //    let previousUrl = this.routerExtService.getPreviousUrl();
  //    if (previousUrl.includes('delivery')) {
  //      this.pedidoDelivery = true;
  //      this.pedido.tipoPedido = TipoPedido.delivery;
  //    } else if (previousUrl.includes('takeaway')) {
  //      this.pedido.tipoPedido = TipoPedido.takeAway;
  //    }
  //  }
  //}
}
