import { Component, OnInit, DoCheck } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StatusService } from '../services/status.service';
import Swal from 'sweetalert2';
import { Status } from '../interfaces/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StatusComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cor', 'quantidade', 'actions'];
  embalagens: any;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  oldExpandedElement: any;
  statusForm: FormGroup;
  status: Status;
  public backgroundColor: string;
  public fontColor: string;
  public linkColor: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statusService: StatusService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.backgroundColor = '#fff';
    this.fontColor = '#222';
    this.linkColor = '#4b4fce';

    this.initializeForm();
    this.statusService.getAll().subscribe((res: any) => {
      this.embalagens = res;
    });
    this.statusService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public setColor(color: string) {
    console.log(color)
  }

  ngDoCheck(): void {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.oldExpandedElement) {
        this.oldExpandedElement = this.expandedElement;
        if (this.expandedElement.id == 0) {
          this.statusForm.reset();
        } else {
          this.statusForm.patchValue(this.expandedElement);
          console.log(this.statusForm.value);
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
    this.statusForm = this.fb.group({
      nome: new FormControl(null, [Validators.required]),
      cor: new FormControl(null, [Validators.required]),
    }, { updateOn: 'change' });
  }

  error() {
    console.log(this.statusForm.value)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSource.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.statusForm.get('id').value) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
        }
      });
    }
    else {
      this.expandedElement = null;
      this.statusForm.reset();
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
    this.statusService.put(this.statusForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.statusForm.reset();
      this.getStatuss();
    }, err => console.log(err));
  }

  getStatuss() {
    this.statusService.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  post() {
    console.log(this.statusForm.value);
    this.editando = false;
    this.expandedElement = null;
    this.statusService.post(this.statusForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.statusForm.reset();
      this.getStatuss();
    }, err => {
      this.getStatuss();
      console.log(err);
    });
  }

  public add() {
    if (!this.editando) {
      this.status = { id: 0, nome: "", cor: "" };
      this.dataSource.data = [this.status].concat(this.dataSource.data);
      this.expandedElement = this.status;
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
        this.statusService.delete(id).subscribe((res: any) => {
          this.getStatuss();
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
