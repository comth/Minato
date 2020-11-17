import { Component, OnInit } from '@angular/core';
import { MesaService } from '../services/mesa.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  mesas;
  status;

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
      console.log('res status' + res);
      console.log(res);
      console.log('status' + this.status);
    });
  }

  getMesas() {
    this.mesaService.getAll().subscribe((res: any) => {
      console.log('res mesa' + res);
      this.mesas = res + [{id:0}]
      console.log('mesa' + this.mesas)
    });
  }

  addMesas() {
    console.log('teste')
  }
}
