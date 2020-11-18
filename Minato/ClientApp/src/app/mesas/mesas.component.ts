import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MesaService } from '../services/mesa.service';
import { Produto } from '../services/produto.service';
import { StatusService } from '../services/status.service';
import { Endereco, Usuario } from '../usuario/usuario.component';

export interface Mesa {
  id: string;
  numero: number;
  status: Status;
  pedido: Pedido;
}

export interface Pedido {
  id: string;
  enderecoSelecionado: Endereco;
  produtos: Produto[];
  usuario: Usuario;
  dataPedido: Date;
}

export interface Status {
  id: string;
  nome: string;
  quantidade: number;
}

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})

export class MesasComponent implements OnInit {

  mesas: any[];
  status: any[];

  constructor(
    private mesaService: MesaService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getStatus();
    this.getMesas();
  }

  getStatus() {
    this.statusService.getAll().subscribe((res: any) => {
      this.status = res;
    });
  }

  getMesas() {
    this.mesaService.getAll().subscribe((res: any[]) => {
      //this.mesas = [...res, { id: 0 }]
      res.push({ id: 0 });
      this.mesas = res;
    });
  }

  async addMesas() {
    let options = [];
    for (var i = 0; i < this.status.length; i++) {
      options.push(this.status[i].nome);
    }
    let regexp = new RegExp('^[1-9]$')
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Número da Mesa',
        input: 'text',
        inputAttributes: {
          id: "swal-input1"
        },
        inputValidator: (value) => {
          if (!regexp.test((<HTMLInputElement>document.getElementById("swal-input1")).value)) {
            return 'Você deve digitar um número'
          }
        }
      },
      {
        title: 'Status da Mesa',
        input: 'radio',
        inputOptions: options,
        inputValidator: (value) => {
          if (!value) {
            return 'Você precisa selecionar um status!'
          }
        }
      }
    ]).then((result: any) => {
      if (result) {
        this.mesaService.post({ numero: result.value[0], status: this.status[result.value[1]] }).subscribe((res) => {
          this.getStatus();
          this.getMesas();
        });
      }
    })
  }
}
