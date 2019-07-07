import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { zip } from 'rxjs';

import { NovaTransacaoComponent } from '../../components/transacoes/nova-transacao/nova-transacao.component';
import { TransacaoModel } from '../../models/transacao.model';
import { CarteiraService } from '../../services/carteira.service';
import { TransacaoService } from '../../services/transacao.service';

/**
 * Componente responsavel por exibir a pagina com os dados das transacoes.
 */
@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {
  // transacoes cadastradas e pendentes - nao mineradas
  public transacoesPendentes: TransacaoModel[];

  // transacoes cadastradas e processadas - mineradas
  public transacoesProcessadas: TransacaoModel[];

  // rotulos dos enderecos da carteira
  public rotulos: { [endereco: string]: string; };

  constructor(
    private modalService: NgbModal,
    private carteiraService: CarteiraService,
    private transacaoService: TransacaoService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // lista de enderecos
    this.listarEnderecos();

    // atualiza as listas de transacoes
    this.listarTransacoesPendentes();
    this.listarTransacoesProcessadas();
  }

  /**
   * Evento disparado quando for solicitado a inclusao de uma nova transacao.
   */
  onNovaTransacao() {
    // carrega e recuperada referencia da modal
    let modal = this.modalService.open(NovaTransacaoComponent, {
      centered: true,
      //size: 'lg',
    });

    // defini tratamentos que serao executados apos o fechamento da modal
    modal.result
      .then(novaTransacao => {
        // atualiza a lista de transacoes pendentes
        this.listarTransacoesPendentes();
      })
      .finally(() => {
      });
  }

  /**
   * Lista os enderecos cadastrados.
   */
  private listarEnderecos() {
    // recupera a lista de enderecos
    zip(
      this.carteiraService.listarEnderecosMinerador(),
      this.carteiraService.listarEnderecosCarteira()
    )
    .subscribe(dados => {
      // inicializa a lista de rotulos dos enderecos
      this.rotulos = {};

      // itera nos enderecos recebidos
      dados[0].concat(dados[1]).forEach(item => {
        // recupera os rotulos dos enderecos
        this.rotulos[item.endereco] = item.rotulo;
      });
    });

  }

  /**
   * Lista as transacoes cadastradas e pendentes.
   */
  listarTransacoesPendentes() {
    // recupera a lista de transacoes
    this.transacaoService
      .listarTransacoesPendentes()
      .subscribe(transacoes => {
        this.transacoesPendentes = transacoes.sort((a, b) => b.dataCriacao - a.dataCriacao);
      });
  }

  /**
   * Lista as transacoes cadastradas e processadas.
   */
  listarTransacoesProcessadas() {
    // recupera a lista de transacoes
    this.transacaoService
      .listarTransacoesProcessadas()
      .subscribe(transacoes => {
        this.transacoesProcessadas = transacoes.sort((a, b) => b.dataCriacao - a.dataCriacao);
      });
  }
}
