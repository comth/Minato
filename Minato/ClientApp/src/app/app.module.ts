import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutoComponent } from './produto/produto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UsuarioComponent } from './usuario/usuario.component';
import { MesasComponent } from './mesas/mesas.component';
import { TakeAwayComponent } from './take-away/take-away.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { RouterExtService } from './services/router-ext.service';
import { ConfiguracaoService } from './services/configuracao.service';
import { PainelPedidosLocalComponent } from './painel-pedidos-local/painel-pedidos-local.component';
import { PainelCozinhaComponent } from './painel-cozinha/painel-cozinha.component';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { EmbalagemComponent } from './embalagem/embalagem.component';
import { StatusComponent } from './status/status.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { InterceptorService } from './services/interceptor.service';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProdutoComponent,
    UsuarioComponent,
    MesasComponent,
    TakeAwayComponent,
    DeliveryComponent,
    PedidoComponent,
    PainelPedidosComponent,
    ConfiguracoesComponent,
    PainelPedidosLocalComponent,
    PainelCozinhaComponent,
    CadastrosComponent,
    EmbalagemComponent,
    StatusComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatTreeModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'produto', component: ProdutoComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'mesas', component: MesasComponent },
      { path: 'takeaway', component: TakeAwayComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'cozinha', component: PainelCozinhaComponent },
      { path: 'local', component: PainelPedidosLocalComponent },
      { path: 'cadastros', component: CadastrosComponent },
      { path: 'cadastros/:index', component: CadastrosComponent },
      { path: 'pedido/:tipoPedido/:idMesa/:numMesa/:idPedido', component: PedidoComponent }, //update pedido local
      { path: 'pedido/:tipoPedido/:idMesa/:numMesa', component: PedidoComponent }, //novo pedido mesa
      { path: 'pedido/:tipoPedido/:idPedido', component: PedidoComponent }, //update pedido existente
      { path: 'pedido/:tipoPedido', component: PedidoComponent }, //novo pedido
    ], { useHash: true, relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
  RouterExtService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  connection: any;
  messages: any;
  userName: any;
  hideJoin: boolean;

  constructor(private configuracaoService: ConfiguracaoService) {
    this.configuracaoService.get().subscribe(res => {
      this.configuracaoService.configuracao = res;
    });
  }

  ngOnInit(): void {
    this.initWebSocket();
    this.connection.start();
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl('/hub/chat')
      .build();

    this.connection.on('messageReceived', (from: string, body: string) => {
      this.messages.push({ from, body });
    });

    this.connection.on('userJoined', user => {
      if (user === this.userName) {
        this.hideJoin = true;
      }
      this.messages.push({ from: '> ', body: user + ' joined' });
    });

    this.connection.on('userLeft', user => {
      this.messages.push({ from: '! ', body: user + ' has left!' });
    });
  }

}
