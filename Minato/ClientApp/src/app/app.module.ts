import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule, IConfig } from 'ngx-mask'
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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
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
      { path: 'pedido/:idMesa/:numMesa', component: PedidoComponent }, //pedidoLocal (mesa)
      { path: 'pedido', component: PedidoComponent }, //novo pedidoDelivery ou pedidoRetirada
      { path: 'pedido/:idPedido', component: PedidoComponent }, //existente pedidoDelivery ou pedidoRetirada
    ], { useHash: true }),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
