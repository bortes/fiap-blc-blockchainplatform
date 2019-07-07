import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Componente responsavel por exibir a aplicacao.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // rota ativa
  public rotaAtiva: string;

  constructor(
    private router: Router,
  ) {
  }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // inscreve-se para receber os eventos relacionados a navegacao - selecionando apenas o de navegacao concluida
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // atualiza a rota ativa
      this.rotaAtiva = event.url.split('/').join('/ ');
    })
  }
}
