import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ECPair, networks, payments } from 'bitcoinjs-lib';
import { Observable, of, ReplaySubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { EnderecoModel } from '../models/endereco.model';

/**
 * Servico responsavel por manipular a carteira.
 */
@Injectable({
  providedIn: 'root'
})
export class CarteiraService {
  // enderecos cadastrados para o minerador
  private cacheEnderecosMinerador: EnderecoModel[];

  // enderecos cadastrados para a carteira
  private cacheEnderecosCarteira: EnderecoModel[];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Lista os enderecos cadastrados para o minerador.
   */
  listarEnderecosMinerador(): Observable<EnderecoModel[]> {
    // utiliza dados cacheados
    if( this.cacheEnderecosMinerador ){
      return of(this.cacheEnderecosMinerador);
    }

    // solicita a lista de enderecos
    const result = this.httpClient
      .get<EnderecoModel[]>(`${environment.urlApiServer}/api/v1/enderecos/minerador`);

    // cachea a resposta recebida
    result.subscribe(response => {
      this.cacheEnderecosMinerador = response;
    });

    // retorna o resultado da solicitacao
    return result;
  }

  /**
   * Lista os enderecos cadastrados para a carteira.
   */
  listarEnderecosCarteira(): Observable<EnderecoModel[]> {
    // utiliza dados cacheados
    if( this.cacheEnderecosCarteira ){
      return of(this.cacheEnderecosCarteira);
    }

    // solicita a lista de enderecos
    const result = this.httpClient
      .get<EnderecoModel[]>(`${environment.urlApiServer}/api/v1/enderecos/carteira`);

    // cachea a resposta recebida
    result.subscribe(response => {
      this.cacheEnderecosCarteira = response;
    });

    // retorna o resultado da solicitacao
    return result;
  }

  /**
   * Gera um novo endereco de maneira aleatorio e registra o mesmo na TetNet.
   */
  gerarNovoEndereco() {
    // dados do pair de chaves
    let keyPair = ECPair.makeRandom()

    // gera um endereco valido para a rede testnet
    let { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet });

    // retorna o endereco gerado
    return address;
  }

  /**
   * Salva o endereco infornado na lista de enderecos cadastrados para a carteira.
   */
  salvarNovoEndereco(dados: EnderecoModel): boolean {
    // consiste novos dados
    dados.endereco = dados && dados.endereco && dados.endereco.length > 34 ? dados.endereco.substr(0, 34) : dados.endereco;
    dados.rotulo = dados && dados.rotulo && dados.rotulo.length > 20 ? dados.rotulo.substr(0, 20): dados.rotulo;

    // salva o endereco
    this.cacheEnderecosCarteira.push(dados);

    // notifica sucesso
    return true;
  }
}
