/**
 * Modelo responsavel pelos dados da entrada atributida a uma transacao.
 */
export class EntradaTransacaoModel {
  public endereco: string;
  public valor: number;
}

/**
 * Modelo responsavel pelos dados da saida atributida a uma transacao.
 */
export class SaidaTransacaoModel {
  public endereco: string;
  public valor: number;
  public troco: boolean;
}

/**
 * Modelo responsavel pelos dados de uma transacao.
 */
export class TransacaoModel {
  public bloco: number;
  public entradas: EntradaTransacaoModel[];
  public saidas: SaidaTransacaoModel[];
  public quantidadeEntradas: number;
  public quantidadeSaidas: number;
  public valorTotalEntrada: number;
  public valorTotalSaida: number;
  public valorTaxa: number;
  public dataCriacao: number;
  public premioMineracao: boolean;
  public hash: string;
}
