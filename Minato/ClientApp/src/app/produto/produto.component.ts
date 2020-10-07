import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Produto {
  idProduto: string;
  nome: string;
  preco: string;
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

export class ProdutoComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['idProduto', 'nome', 'preco', 'actions'];
  dataSource: MatTableDataSource<Produto>;
  produtos: Produto[];
  expandedElement: Produto | null;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private produtoService: ProdutoService) {
   
  }

  ngOnInit(): void {
    this.produtoService.getAll(10, 1).subscribe((res: Produto[]) => {
      this.dataSource = new MatTableDataSource(Array.from<Produto>(res));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


