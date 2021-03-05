import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { StatusService } from '../services/status.service';
import { ConfiguracaoService } from '../services/configuracao.service';
import { Configuracao } from '../interfaces/configuracao';
import { Status } from '../interfaces/status';
import Swal from 'sweetalert2';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

interface Node {
  name: string;
  children?: Node[];
}

const TREE_DATA: Node[] = [
  {
    name: 'Mesas',
  }, {
    name: 'Entregas',
  }, {
    name: 'Cobranças',
  }, {
    name: 'Chaves',
  }, {
    name: 'Gerais',
  }
];

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})

export class ConfiguracoesComponent implements OnInit {

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;
  nodeSelecionado = new BehaviorSubject<Node>({ name: null });
  configuracao: Configuracao = { statusFinalPedido: null, statusInicioPedido: null };
  listaStatus: Status[];

  constructor(
    private statusService: StatusService,
    private configuracaoService: ConfiguracaoService,
    //private navComponent: NavMenuComponent
  ) {
    this.dataSource.data = TREE_DATA;
    this.nodeSelecionado.next({
      name: 'Mesas',
    })
  }

  ngOnInit(): void {
    this.tratarNode();
    this.getConfiguracao();
  }

  put() {
    this.configuracaoService.put(this.configuracao).subscribe(res => {
      Swal.fire('Salvo!', '', 'success');
      this.getConfiguracao();
      //this.navComponent.nomeExibicao = this.configuracao.nomeExibicao;
    });
  }

  getConfiguracao() {
    this.configuracaoService.get().subscribe(res => {
      this.configuracao = <Configuracao>res;
    });
  }

  tratarNode() {
    this.nodeSelecionado.subscribe(data => {
      if (data) {
        if (data.name == 'Mesas') this.getListaStatus();
      }
    });
  }

  getListaStatus() {
    this.statusService.getAll().subscribe(res => {
      this.listaStatus = <Status[]>res;
    });
  }

  click(data: any) {
    this.nodeSelecionado.next(data);
  }

  compareCategoryObjects(object1: any, object2: any) {
    if (object2) {
      if (object1.id == object2.id) return true;
      return false;
    }
  }

}
