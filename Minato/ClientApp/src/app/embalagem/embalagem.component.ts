import { Component, OnInit, DoCheck } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EmbalagemService } from '../services/embalagem.service';
import Swal from 'sweetalert2';
import { Embalagem } from '../interfaces/embalagem';

@Component({
  selector: 'app-embalagem',
  templateUrl: './embalagem.component.html',
  styleUrls: ['./embalagem.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EmbalagemComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'preco', 'actions'];
  embalagens: any;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  embalagemForm: FormGroup;
  embalagem: Embalagem;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private embalagemService: EmbalagemService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.embalagemService.getAll().subscribe((res: any) => {
      this.embalagens = res;
    });
    this.embalagemService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngDoCheck(): void {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.oldExpandedElement) {
        this.oldExpandedElement = this.expandedElement;
        if (this.expandedElement.id == 0) {
          this.embalagemForm.reset();
        } else {
          console.log(this.expandedElement)
          this.embalagemForm.patchValue(this.expandedElement);
          console.log(this.embalagemForm.value)
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

  initializeForm() {
    this.embalagemForm = this.fb.group({
      id: new FormControl(null),
      nome: new FormControl(null, [Validators.required]),
      preco: new FormControl(null, [Validators.required]),
    }, { updateOn: 'change' });
  }

  error() {
    console.log(this.embalagemForm.value)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSource.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.embalagemForm.get('id').value) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
        }
      });
    }
    else {
      this.expandedElement = null;
      this.embalagemForm.reset();
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
    console.log(this.embalagemForm.value)
    this.embalagemService.put(this.embalagemForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.embalagemForm.reset();
      this.getEmbalagems();
    }, err => console.log(err));
  }

  getEmbalagems() {
    this.embalagemService.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  post() {
    console.log(this.embalagemForm.value);
    this.editando = false;
    this.expandedElement = null;
    this.embalagemService.post(this.embalagemForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.embalagemForm.reset();
      this.getEmbalagems();
    }, err => {
      this.getEmbalagems();
      console.log(err);
    });
  }

  public add() {
    if (!this.editando) {
      this.embalagem = { id: 0, nome: "", preco: 0 };
      this.dataSource.data = [this.embalagem].concat(this.dataSource.data);
      this.expandedElement = this.embalagem;
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
        this.embalagemService.delete(id).subscribe((res: any) => {
          this.getEmbalagems();
          Swal.fire({
            position: 'top',
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
