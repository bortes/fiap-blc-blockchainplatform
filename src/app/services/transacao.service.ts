import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crypto } from 'bitcoinjs-lib';
import { Observable, of } from 'rxjs';

import { TransacaoModel } from '../models/transacao.model';
import { environment } from '../../environments/environment';

/**
 * Servico responsavel por manipular as transacoes.
 */
@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  // transacoes cadastradas e pendentes - nao mineradas
  private cacheTransacoesPendentes: TransacaoModel[];

  // transacoes cadastradas e processadas - mineradas
  private cacheTransacoesProcessadas: TransacaoModel[];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Lista as transacoes cadastradas e pendentes.
   */
  listarTransacoesPendentes(): Observable<TransacaoModel[]> {
    // utiliza dados cacheados
    if( this.cacheTransacoesPendentes ){
      return of(this.cacheTransacoesPendentes);
    }

    // solicita a lista de transacoes
    const result = this.httpClient
      .get<TransacaoModel[]>(`${environment.urlApiServer}/api/v1/transacoes/pendentes`);

    // cachea a resposta recebida
    result.subscribe(response => {
      this.cacheTransacoesPendentes = response;
    });

    // retorna o resultado da solicitacao
    return result;
  }

  /**
   * Lista as transacoes cadastradas e processadas.
   */
  listarTransacoesProcessadas(): Observable<TransacaoModel[]> {
    // utiliza dados cacheados
    if( this.cacheTransacoesProcessadas ){
      return of(this.cacheTransacoesProcessadas);
    }

    // solicita a lista de transacoes
    const result = this.httpClient
      .get<TransacaoModel[]>(`${environment.urlApiServer}/api/v1/transacoes/processadas`);

    // cachea a resposta recebida
    result.subscribe(response => {
      this.cacheTransacoesProcessadas = response;
    });

    // retorna o resultado da solicitacao
    return result;
  }

  /**
   * Calcula e atualiza o hash da transacao.
   */
  calcularHashTransacao(transacao: TransacaoModel): TransacaoModel {
    let { hash, ...dados } = transacao;

    // calcula o hash da transacao
    transacao.hash = crypto.hash256(Buffer.from(JSON.stringify(dados))).toString('hex');

    // retorna a transacao atualizada
    return transacao;
  }

  /**
   * Salva a transacao infornada na lista de transacoes pendentes.
   */
  salvarNovaTransacao(dados: TransacaoModel): boolean {
    // consiste novos dados
    dados.quantidadeEntradas = dados.entradas.length;
    dados.valorTotalEntrada = dados.entradas.reduce((valor, entrada,) => valor += entrada.valor, 0);
    dados.quantidadeSaidas = dados.saidas.length;
    dados.valorTotalSaida = dados.saidas.reduce((valor, saida,) => valor += saida.valor, 0);
    dados = this.calcularHashTransacao(dados);

    // salva o endereco
    this.cacheTransacoesPendentes.push(dados);

    // notifica sucesso
    return true;
  }
}
