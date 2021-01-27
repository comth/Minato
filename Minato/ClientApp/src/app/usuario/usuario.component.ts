import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { ViaCepService } from '../services/via-cep.service';

export interface Usuario {
  id: number;
  nome: string;
  enderecos: Endereco[];
  telefones: Telefone[];
}

export interface Telefone {
  id: string;
  value: string;
}

export interface Endereco {
  id: string;
  bairro: string;
  cep: string;
  logradouro: string;
  complemento: string;
  observacao: string;
  numero: string;
  uf: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsuarioComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['nome', 'actions'];
  embalagens: any;
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;
  editando: boolean;
  OldExpandedElement: any;
  usuarioForm: FormGroup;
  usuario: Usuario;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private cepService: ViaCepService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.usuarioService.getAll().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngDoCheck(): void {
    if (this.expandedElement) {
      if (this.expandedElement && this.expandedElement != this.OldExpandedElement) {
        this.OldExpandedElement = this.expandedElement;
        if (this.expandedElement.id == 0) {
          this.usuarioForm.reset();
        } else {
          this.usuarioForm.patchValue(this.expandedElement);
        }
      }
    }
  }

  initializeForm() {
    this.usuarioForm = this.fb.group({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      enderecos: this.fb.array([this.fb.group({
        id: new FormControl(0),
        bairro: new FormControl('', [Validators.required]),
        cep: new FormControl('', [Validators.required]),
        logradouro: new FormControl('', [Validators.required]),
        localidade: new FormControl('', [Validators.required]),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        observacao: new FormControl(''),
        uf: new FormControl('', [Validators.required]),
      })]),
      telefones: this.fb.array([this.fb.group({
        id: new FormControl(0),
        value: new FormControl(null)
      })]),
    }, { updateOn: 'change' }); 
  }

  get telefones(): FormArray {
    return this.usuarioForm.get('telefones') as FormArray;
  }

  get enderecos(): FormArray {
    return this.usuarioForm.get('enderecos') as FormArray;
  }

  addTelefone() {
    this.telefones.push(this.fb.group({
      value: new FormControl(null)
    }));
  }

  removeTelefone(index: number) {
    this.telefones.removeAt(index);
  }

  addEndereco() {
    this.enderecos.push(this.fb.group({
      id: new FormControl(0),
      bairro: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      localidade: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      observacao: new FormControl(''),
      uf: new FormControl('', [Validators.required]),
    }));
  }

  removeEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  autoCompleteCep(i) {
    let cep = this.usuarioForm.get('enderecos').value[i].cep as string;
    if (cep.length == 8) {
      this.cepService.get(cep).subscribe((res: any) => {
        let form = this.usuarioForm.value;
        res.cep = cep;
        form.enderecos[i] = res;
        this.usuarioForm.patchValue(form);
      }, err => console.log(err));
    }
  }

  error() {
    console.log(this.usuarioForm)
  }

  cancel() {
    if (this.editando) {
      this.expandedElement = null;
      this.editando = false;
      this.dataSource.data.forEach((item, index) => {
        if (item.id == 0 || item.id == this.usuarioForm.get('id').value) {
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = this.dataSource.data;
        }
      });
    }
    else {
      this.expandedElement = null;
      this.usuarioForm.reset();
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
    this.usuarioService.put(this.usuarioForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.usuarioForm.reset();
      this.getUsuarios();
    }, err => console.log(err));
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  post() {
    console.log(this.usuarioForm.value);
    this.editando = false;
    this.expandedElement = null;
    this.usuarioService.post(this.usuarioForm.value).subscribe((res: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Salvo!',
        showConfirmButton: false,
        timer: 1500
      });
      this.usuarioForm.reset();
      this.getUsuarios();
    }, err => {
      this.getUsuarios();
      console.log(err);
    });
  }

  public add() {
    if (!this.editando) {
      this.usuario = {
        id: 0, nome: "", enderecos: null, telefones: null};
      this.dataSource.data = [this.usuario].concat(this.dataSource.data);
      this.expandedElement = this.usuario;
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
        this.usuarioService.delete(id).subscribe((res: any) => {
          this.getUsuarios();
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
