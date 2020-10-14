import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmbalagemService } from '../services/embalagem.service';

export interface Produto {
  idProduto: number;
  nome: string;
  preco: number;
  embalagem: any;
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

  displayedColumns: string[] = ['idProduto', 'nome', 'preco', 'embalagem','actions'];
  embalagens: any;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  produtoForm: FormGroup;
  produto: Produto;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private embalagemService: EmbalagemService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.embalagemService.getAll().subscribe((res: any) => {
      this.embalagens = res;
    });

    this.produtoService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  initializeForm() {
    this.produtoForm = this.fb.group({
      idProduto: new FormControl(null, [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      preco: new FormControl(null, [Validators.required]),
      embalagem: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.produtoForm.value);
    this.produto = this.produtoForm.value;

    this.dataSource.data = this.dataSource.data.concat(this.produto);
    this.editando = false;
    this.expandedElement = null;
    this.produtoService.post(this.produto).subscribe((res: any) => {
      
      this.produtoService.getAll().subscribe((res: any) => {
        this.dataSource.data = res;
      });
    }, err => console.log(err));
  }

  public add() {
    if (!this.editando) {
      this.produto = { idProduto: 0, nome: "", preco: 0, embalagem: null };
      this.dataSource.data = [this.produto].concat(this.dataSource.data);
      this.expandedElement = this.produto;
      this.editando = true;
    } 
  }

  public delete(idProduto: any) {
    this.produtoService.delete(idProduto).subscribe((res: any) => {
      console.log(res);
      this.produtoService.getAll().subscribe((res: any) => {
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


