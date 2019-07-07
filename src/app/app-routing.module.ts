import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlocosComponent } from './pages/blocos/blocos.component';
import { CarteiraComponent } from './pages/carteira/carteira.component';
import { ErroComponent } from './pages/erro/erro.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';

const ROUTES: Routes = [
  { path: 'carteira', component: CarteiraComponent },
  { path: 'transacoes', component: TransacoesComponent },
  { path: 'blocos', component: BlocosComponent },
  { path: '', redirectTo: '/carteira', pathMatch: 'full' },
  { path: '**', component: ErroComponent }
];

/**
 * Modulo responsavel pelas rotas da aplicacao.
 */
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
