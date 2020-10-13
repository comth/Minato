import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Produto {
  idProduto: number;
  nome: string;
  preco: number;
  //add embalagem
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProdutoComponent implements  OnInit{

  displayedColumns: string[] = ['idProduto', 'nome', 'preco', 'actions'];
  embalagens: string[] = ['Pequena', 'Média', 'Grande'];
  dataSource: MatTableDataSource<Produto>;
  produtos: Produto[];
  expandedElement: Produto | null;
  editando: boolean;
  produtoForm: FormGroup;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private produtoService: ProdutoService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.produtoService.getAll().subscribe((res: Produto[]) => {
      this.dataSource = new MatTableDataSource(Array.from<Produto>(res));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  initializeForm() {
    this.produtoForm = this.fb.group({
      idProduto: 0,
      nome: '',
      preco: 0,
      embalagem: ''
    });
  }

  onSubmit() {
    console.log(this.produtoForm);
  }

  public add() {
    if (!this.editando) {
      let produtoFantasma = { idProduto: 0, nome: "", preco: 0 };
      this.dataSource.data = [produtoFantasma].concat(this.dataSource.data);
      this.expandedElement = produtoFantasma;
      this.editando = true;
    } 
  }

  public delete(idProduto: any) {
    this.produtoService.delete(idProduto).subscribe((res: any) => {
      console.log(res);
      //remover só do front???
      this.produtoService.getAll().subscribe((res: Produto[]) => {
        this.dataSource.data = res;
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


