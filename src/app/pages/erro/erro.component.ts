import { Component, OnInit } from '@angular/core';

/**
 * Componente responsavel por exibir a pagina com os dados do erro ocorrido.
 */
@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss']
})
export class ErroComponent implements OnInit {

  constructor() { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
  }
}
