import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crypto } from 'bitcoinjs-lib';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { BlocoModel } from '../models/bloco.model';

/**
 * Servico responsavel por manipular os blocos.
 */
@Injectable({
  providedIn: 'root'
})
export class BlocoService {
  // blocos minerados
  private cacheBlocosMinerados: BlocoModel[];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Lista os blocos minerados
   */
  listarBlocosMinerados(): Observable<BlocoModel[]> {
    // utiliza dados cacheados
    if( this.cacheBlocosMinerados ){
      return of(this.cacheBlocosMinerados);
    }

    // solicita a lista de transacoes
    const result = this.httpClient
      .get<BlocoModel[]>(`${environment.urlApiServer}/api/v1/blocos/minerados`);

    // cachea a resposta recebida
    result.subscribe(response => {
      this.cacheBlocosMinerados = response;
    });

    // retorna o resultado da solicitacao
    return result;
  }

  /**
   * Atualiza o hash do bloco informado.
   */
  atualizarHashBloco(bloco: BlocoModel){
    // PARA EFEITOS DE APRESENTACAO ESTAMOS CONSIDERANDO APENAS ALGUNS DADOS - PASSIVEIS DE MOFICACAO PELO USUARIO

    // 1) hash do bloco anterior
    const hashBlocoAnterior = bloco.hashBlocoAnterior;

    // 2) a lista dos hash das transacoes selecionadas para serem mineradas pelo bloco informado
    const hashTransacoesBloco = bloco.transacoes.filter(transacao => !transacao.premioMineracao).map(transacao => transacao.hash);

    let dados = {
      nonce: bloco.nonce,
      hashBlocoAnterior,
      hashTransacoesBloco
    }

    // gera o hash do bloco
    bloco.hashBloco = crypto.hash256(Buffer.from(JSON.stringify(dados))).toString('hex');
  }

  /**
   * Minera o bloco informado em busca do nonce que atesta a Prova de Trabalho do esforco empreendido.
   */
  minerarBloco(bloco: BlocoModel, altura: number): boolean {
    // NAO USAR PROGRAMACAO ASSINCRONA PARA REPRESENTAR O TRABALHO EXECUTADO PELO MINERADOR

    // dificuldade esperada - deveria vir da rede, mas OK
    const dificuldade = '1000';
    
    // PARA EFEITOS DE APRESENTACAO ESTAMOS CONSIDERANDO APENAS ALGUNS DADOS - PASSIVEIS DE MOFICACAO PELO USUARIO

    // 1) hash do bloco anterior
    const hashBlocoAnterior = bloco.hashBlocoAnterior;

    // 2) a lista dos hash das transacoes selecionadas para serem mineradas pelo bloco informado
    const hashTransacoesBloco = bloco.transacoes.filter(transacao => !transacao.premioMineracao).map(transacao => transacao.hash);

    // itera 1.000.000 de vez ate encontra o nonce que atesta
    for(let nonce = 0; nonce < 1000000; nonce++){
      let dados = {
        nonce,
        hashBlocoAnterior,
        hashTransacoesBloco
      }

      // gera o hash do bloco
      let hashBloco = crypto.hash256(Buffer.from(JSON.stringify(dados))).toString('hex');

      // consiste dificuldade esperada
      if( hashBloco.substr(0, 4) === '0000') {
        // fecha o bloco
        bloco.dataCriacao = new Date().getTime();
        bloco.altura = altura;
        bloco.dificuldade = parseInt(dificuldade, 1000);
        bloco.nonce = nonce;
        bloco.hashBloco = hashBloco;

        // notifica bloco minerado
        return true;
      }
    }

    // notifica bloco nao minerado
    return false;
  }

}

