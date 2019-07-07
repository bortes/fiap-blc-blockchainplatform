import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NovoEnderecoComponent } from './components/carteira/novo-endereco/novo-endereco.component';
import { NovaTransacaoComponent } from './components/transacoes/nova-transacao/nova-transacao.component';
import { MockInterceptor } from './interceptors/mock.interceptor';
import { BlocosComponent } from './pages/blocos/blocos.component';
import { CarteiraComponent } from './pages/carteira/carteira.component';
import { ErroComponent } from './pages/erro/erro.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';

/**
 * Modulo responsavel pela aplicacao.
 */
@NgModule({
  declarations: [
    AppComponent,
    BlocosComponent,
    CarteiraComponent,
    ErroComponent,
    NovaTransacaoComponent,
    NovoEnderecoComponent,
    TransacoesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MockInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    NovaTransacaoComponent,
    NovoEnderecoComponent,
  ]
})
export class AppModule { }
