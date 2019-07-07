import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BlocoService } from '../../services/bloco.service';
import { CarteiraService } from '../../services/carteira.service';
import { TransacaoService } from '../../services/transacao.service';
import { BlocoModel } from '../../models/bloco.model';

/**
 * Componente responsavel por exibir a pagina com os dados da cadeia de blocos.
 */
@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.scss']
})
export class BlocosComponent implements OnInit {
  // lista de blocos minerados
  public blocosMinerados: BlocoModel[];

  // controle utilizado para notificar mineracao em execucao
  public minerando: boolean;

  constructor(
    private modalService: NgbModal,
    private carteiraService: CarteiraService,
    private transacaoService: TransacaoService,
    private blocoService: BlocoService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    this.listarBlocosMinerados();
  }

  /**
   * Lista os blocos minerados na cadeia de blocos.
   */
  private listarBlocosMinerados(){
    // recupera a lista de transacoes
    this.blocoService
      .listarBlocosMinerados()
      .subscribe(blocos => {
        this.blocosMinerados = blocos;
      });
  }

  /**
   * Calcular a quantidade de transacoes mineradas pelo bloco.
   */
  calcularTransacoesMineradasBloco(bloco: BlocoModel){
    return bloco.transacoes.filter( transacao => !transacao.premioMineracao ).length;
  }

  /**
   * Minera o bloco informado em busca do nonce que atesta a Prova de Trabalho do esforco empreendido.
   */
  minerarBloco(bloco: BlocoModel, altura: number){
    // notificao mineracao em execucao
    this.minerando = true;

    // apenas para forcar aguardar a sensibilizacao da interface
    setTimeout(() => {
      // minera o bloco informado
      this.blocoService.minerarBloco(bloco, altura);

      // notificao fim na mineracao
      this.minerando = false;
    },250);
  }
}
