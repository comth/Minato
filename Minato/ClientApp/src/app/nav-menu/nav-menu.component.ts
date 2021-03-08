import { Component } from '@angular/core';
import { Configuracao } from '../interfaces/configuracao';
import { ConfiguracaoService } from '../services/configuracao.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(public configuracaoService: ConfiguracaoService) { }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
