import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmbalagemService } from '../services/embalagem.service';
import Swal from 'sweetalert2';

export interface Produto {
  id: number;
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

export class ProdutoComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['id', 'nome', 'preco', 'embalagem','actions'];
  embalagens: any;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  OldExpandedElement: any;
  produtoForm: FormGroup;
  produto: Produto;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private produtoService: ProdutoService,
    private embalagemService: EmbalagemService,
    private fb: FormBuilder) {
  }

  ngDoCheck(): void {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.OldExpandedElement) {
        this.OldExpandedElement = this.expandedElement;
        if (this.expandedElement.id == 0) {
          this.produtoForm.reset();
        } else {
          this.produtoForm.patchValue(this.expandedElement);
        }
      }
    }
  }

  compareCategoryObjects(object1: any, object2: any) {
    if (object2) {
      if (object1.id == object2.id) return true;
      return false;
    }
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
      id: new FormControl(null, [Validators.required, this.validarId()]),
      nome: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required]),
      embalagem: new FormControl(null),
    }, { updateOn: 'change' });
  }

  validarId(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.dataSource) return null;

      if (control.value == 0) return { invalid: "Este Id não é válido" };

      let repetido = this.dataSource.data.find(e => e.id == control.value)
      
      if (!repetido) return null;

      if (repetido.id == this.expandedElement.id) return null;

      else return { conflict: "Este Id já está em uso" };
    }
  }

  error() {
    console.log(this.produtoForm)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSource.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.produtoForm.get('id').value) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
        }
      });
    }
    else {
      this.expandedElement = null;
      this.produtoForm.reset(); 
    }
  }

  onSubmit() {
    if (this.editando) {
      this.post();
    }
    else {
      this.put();
    }
  }

  put() {
    this.expandedElement = null;
    this.produtoService.put(this.produtoForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.produtoForm.reset();
      this.produtoService.getAll().subscribe((res: any) => {
        this.dataSource.data = res;
      });
    }, err => console.log(err));
  }

  post() {
    console.log(this.produtoForm.value);
    this.editando = false;
    this.expandedElement = null;
    this.produtoService.post(this.produtoForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.produtoForm.reset();
      this.produtoService.getAll().subscribe((res: any) => {
        this.dataSource.data = res;
      });
    }, err => console.log(err));
  }

  public add() {
    if (!this.editando) {
      this.produto = { id: 0, nome: "", preco: 0, embalagem: null };
      this.dataSource.data = [this.produto].concat(this.dataSource.data);
      this.expandedElement = this.produto;
      this.editando = true;
    } 
  }

  public delete(id: any) {
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
        this.produtoService.delete(id).subscribe((res: any) => {
          this.produtoService.getAll().subscribe((res: any) => {
            this.dataSource.data = res;
          });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deletado!',
            showConfirmButton: false,
            timer: 1500
          })
        }); 
      };
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


