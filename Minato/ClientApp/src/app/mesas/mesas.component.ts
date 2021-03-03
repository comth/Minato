import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MesaService } from '../services/mesa.service';
import { StatusService } from '../services/status.service';

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
    private statusService: StatusService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getStatus();
    this.getMesas();
  }

  getStatus() {
    this.statusService.getAll().subscribe((res: any[]) => {
      //res = [{ id: 0 }].concat(res);
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

  clickStatus(status: any) {
    Swal.fire({
      title: 'Que operação dejesa?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Editar`,
      denyButtonText: `Deletar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.putStatus(status);
      } else if (result.isDenied) {
        this.deleteStatus(status.id);
      }
    })
  }

  putStatus(status: any) {
    Swal.mixin({
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        confirmButtonText: 'Próxima &rarr;',
        title: 'Nome do Status',
        input: 'text',
        inputValue: status.nome,
      },
      {
        confirmButtonText: 'Registar status',
        title: 'Cor do Status',
        input: 'text',
        inputValue: status.cor,
      }
    ]).then((result: any) => {
      
      if (result && !result.dismiss) {
        this.statusService.put({ id: status.id ,nome: result.value[0], cor: result.value[1] }).subscribe((res) => {
          this.getStatus();
          this.getMesas();
        });
      }
    })
  }

  deleteStatus(id) {
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
          this.getStatus();
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

  clickMesa(mesa) {
    Swal.fire({
      title: 'O que deseja fazer?',
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: `Fazer Pedido`,
      cancelButtonText: `Mudar Status`,
      cancelButtonColor: `#5F9EA0`,
      denyButtonText: `Deletar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (mesa.pedido) {
          this.router.navigate(['/pedido/' + mesa.id + '/' + mesa.numero + '/' + mesa.pedido.id])
        } else {
          this.router.navigate(['/pedido/' + mesa.id + '/' + mesa.numero])
        }
        
      } else if (result.isDenied) {
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
            this.mesaService.delete(mesa.id).subscribe((res: any) => {
              this.getStatus();
              this.getMesas();
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
      else if (result.dismiss.toString() == 'cancel') {
        let options = [];
        for (var i = 0; i < this.status.length; i++) {
          if (this.status[i].id != 0)
            options.push(this.status[i].nome);
        }

        Swal.fire({
          title: 'Status da Mesa',
          input: 'radio',
          inputOptions: options,
          cancelButtonText: 'Cancelar',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Você precisa selecionar um status!'
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            mesa.status = this.status[+result.value];
            this.mesaService.put(mesa).subscribe((res: any) => {
              this.getStatus();
              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Atualizado!',
                showConfirmButton: false,
                timer: 1500
              })
            });
          };
        });
      }
    })
  }

  async addMesas() {
    let options = [];

    for (var i = 0; i < this.status.length; i++) {
      if(this.status[i].id != 0)
        options.push(this.status[i].nome);
    }

    let regexp = new RegExp('^[0-9]+$')
    Swal.mixin({
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        confirmButtonText: 'Próxima &rarr;',
        title: 'Número da Mesa',
        input: 'text',
        inputAttributes: {
          id: "swal-input1"
        },
        inputValidator: async (value) => {
          if (value == '0') {
            return 'Valor inválido'
          };
          if (!regexp.test(value)) {
            return 'Você deve digitar um número'
          };
          if (await this.existsNumero(value)) {
            return 'Esse valor já está em uso'
          }
        }
      },
      {
        confirmButtonText: 'Registar mesa',
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
      if (result && !result.dismiss) {
        this.mesaService.post({ numero: result.value[0], status: this.status[+result.value[1] + 1] }).subscribe((res) => {
          this.getStatus();
          this.getMesas();
        });
      }
    })
  }

  addStatus() {
    Swal.mixin({
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        confirmButtonText: 'Próxima &rarr;',
        title: 'Nome do Status',
        input: 'text',
        inputAttributes: {
          id: "swal-input1"
        }
      },
      {
        confirmButtonText: 'Registar status',
        title: 'Cor do Status',
        input: 'text',
      }
    ]).then((result: any) => {
      if (result && !result.dismiss) {
        this.statusService.post({ nome: result.value[0], cor: result.value[1] }).subscribe((res) => {
          this.getStatus();
          this.getMesas();
        });
      }
    })
  }

  existsNumero(numero) {
    return new Promise(resolve => {
      this.mesaService.existsNumero(numero).subscribe(res => { resolve(false) },
        err => {
        if (err.error.status == 409) {
          resolve(true);
          }
          resolve(false);
      });
    }); 
  }
}
