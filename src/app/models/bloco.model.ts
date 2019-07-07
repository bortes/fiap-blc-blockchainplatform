import { TransacaoModel } from './transacao.model';

/**
 * Modelo responsavel pelos dados de um endereco.
 */
export class BlocoModel {
  public dataCriacao: number;
  public altura: number;
  public dificuldade: number;
  public nonce: number;
  public hashBlocoAnterior: string;
  public hashBloco: string;
  public transacoes: TransacaoModel[];
}