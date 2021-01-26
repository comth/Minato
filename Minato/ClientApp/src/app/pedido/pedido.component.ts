import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../mesas/mesas.component';
import { PedidoService } from '../services/pedido.service';
import { MesaService } from '../services/mesa.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProdutoService } from '../services/produto.service';
import { each } from 'jquery';

export interface Produto {
  idBanco: number;
  id: number;
  nome: string;
  preco: number;
  embalagem: any;
}

export interface ProdutoPedido {
  id: number;
  produto: Produto;
  quantidade: number;
  observacao: string;
}

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

  myControl = new FormControl();
  options: any[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  idMesa: number;
  numMesa: number;
  pedido: Pedido;
  hasPedido: boolean;
  displayedColumns: string[] = ['produto', 'quantidade', 'observacao','actions'];
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  produtoPedidoForm: FormGroup;
  produto: Produto;
  produtoPedido: ProdutoPedido;
  checked = false;
  option: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.idMesa = params['idMesa'];
      this.numMesa = params['numMesa'];
    });
  }

  ngOnInit(): void {
    this.editando = false;
    this.getPedido(this.idMesa);
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeForm();
    this.getProdutos();
    this.initializeAutoComplete();
  }

  getProdutos() {
    this.produtoService.getAll().subscribe((res: any) => {
      this.options = res;
    });
  }

  getPedido(idMesa) {
    this.pedidoService.getByMesa(idMesa).subscribe((res: any) => {
      this.hasPedido = res = null ? true : false;
      this.pedido = res;
    }, err => console.log(err));
  }

  ngDoCheck(): void {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.oldExpandedElement) {
        this.oldExpandedElement = this.expandedElement;
         this.produtoPedidoForm.patchValue(this.expandedElement);
      }
    }
  }

  initializeForm() {
    this.produtoPedidoForm = this.fb.group({
      produto: new FormControl(null, [Validators.required]),
      quantidade: new FormControl(1, [Validators.required]),
      observacao: new FormControl(null),
    }, { updateOn: 'change' });
  }

  initializeAutoComplete() {
    this.filteredOptions =
      this.produtoPedidoForm.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
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
    if (this.editando) {
      this.addProdutoPedido();
    }
    else {
      this.put();
    }
  }

  put() {
    this.expandedElement = null;
    this.produtoService.put(this.produtoPedidoForm.value).subscribe((res: any) => {
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

  mandarPedido() {
    console.log('funcionando')
    // if houver put
    //else post
  }

  post() {
    this.pedidoService.post(this.dataSource.data).subscribe((res: any) => {
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
        console.log(indice)
        console.log(this.dataSource.data.splice(indice, 1));
        this.dataSource.data = this.dataSource.data
        console.log(this.dataSource.data)
      };
      this.expandedElement = null;
    })
  }

  displayFn(produto: any): string {
    return produto && produto.nome ? produto.nome : '';
  }

  private _filter(value: any): any[] {
    let filterValue = '';
    if (value.produto?.nome) {
      filterValue = value.produto.nome.toLowerCase();
    } else if (value.produto) {
      filterValue = value.produto.toLowerCase();
    }
    return this.options.filter(option =>
      option.nome.toLowerCase().includes(filterValue) || option.id.toString().includes(filterValue)
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
