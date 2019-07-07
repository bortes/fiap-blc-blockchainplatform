import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, zip } from 'rxjs';
import { EnderecoModel } from 'src/app/models/endereco.model';

import { CarteiraService } from '../../../services/carteira.service';
import { TransacaoService } from '../../../services/transacao.service';
import { TransacaoModel } from 'src/app/models/transacao.model';

/**
 * Componente responsavel por exibir o cadastro de uma nova transacao.
 */
@Component({
  selector: 'app-nova-transacao',
  templateUrl: './nova-transacao.component.html',
  styleUrls: ['./nova-transacao.component.scss']
})
export class NovaTransacaoComponent implements OnInit {
  // formulario para cadastro de nova transacao
  public novaTransacaoForm: FormGroup;

  // lista de enderecos disponiveis para envio
  public enderecosDisponiveis: EnderecoModel[];

  // balando disponivel para cada endereco disponivel
  public enderecosBalanco: { [endereco: string]: number; };

  // endereco de origem selecionado
  public enderecoOrigem: EnderecoModel;

  // valor total informado - valor informado para cada endereco de destino
  public totalInformado: number;

  // total de enderecos de destino selecionado
  public totalEnderecosDestino: number;

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private carteiraService: CarteiraService,
    private transacaoService: TransacaoService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // inicializa formulario para acesso como pessoa fisica
    this.novaTransacaoForm = this.formBuilder.group({
      'endereco_origem': ['', Validators.compose([Validators.required])],
      // TODO refatorar para lista, porem lista sao sequencias - avaliar estrutura
      'endereco_destino_0': ['', Validators.compose([Validators.required])],
      'endereco_destino_1': ['', Validators.compose([Validators.required])],
      'endereco_destino_2': ['', Validators.compose([Validators.required])],
      'endereco_destino_3': ['', Validators.compose([Validators.required])],
      'endereco_destino_4': ['', Validators.compose([Validators.required])],
      'endereco_destino_5': ['', Validators.compose([Validators.required])],
      'endereco_destino_6': ['', Validators.compose([Validators.required])],
      'endereco_destino_7': ['', Validators.compose([Validators.required])],
      'endereco_destino_8': ['', Validators.compose([Validators.required])],
      'endereco_destino_9': ['', Validators.compose([Validators.required])],
      // TODO refatorar para lista, porem lista sao sequencias - avaliar estrutura
      'valor_0': ['', Validators.compose([Validators.required])],
      'valor_1': ['', Validators.compose([Validators.required])],
      'valor_2': ['', Validators.compose([Validators.required])],
      'valor_3': ['', Validators.compose([Validators.required])],
      'valor_4': ['', Validators.compose([Validators.required])],
      'valor_5': ['', Validators.compose([Validators.required])],
      'valor_6': ['', Validators.compose([Validators.required])],
      'valor_7': ['', Validators.compose([Validators.required])],
      'valor_8': ['', Validators.compose([Validators.required])],
      'valor_9': ['', Validators.compose([Validators.required])],
      'taxa': ['', Validators.compose([Validators.required])],
    });

    // carrega enderecos disponiveis
    this.carregarEnderecos();
  }

  /**
   * Lista os enderecos disponiveis para transacionarmos.
   */
  carregarEnderecos() {
    const result$ = new Subject<Boolean>();

    zip(
      this.carteiraService.listarEnderecosMinerador(),
      this.carteiraService.listarEnderecosCarteira(),
      this.transacaoService.listarTransacoesProcessadas(),
    )
    .subscribe(dados => {
      // inicializa a lista de balanco dos enderecos
      this.enderecosBalanco = {};

      // recupera os dados de cada transacao
      dados[2].forEach(transacao => {
        // recupera os dados de cada entrada
        transacao.entradas.forEach(entrada => {
          // atuaza o balanco do endereco
          this.enderecosBalanco[entrada.endereco] = (this.enderecosBalanco[entrada.endereco] || 0) - entrada.valor; 
        });

        // recupera os dados de cada saida
        transacao.saidas.forEach(saida => {
          // atuaza o balanco do endereco
          this.enderecosBalanco[saida.endereco] = (this.enderecosBalanco[saida.endereco] || 0) + saida.valor; 
        });
      });

      // recupera os enderecos disponiveis
      this.enderecosDisponiveis = [].concat(dados[0], dados[1]);

      // itera na lista de enderecos disponiveis
      this.enderecosDisponiveis.forEach(enderecoDisponivel => {
        // consiste que todos os enderecos cadastrados tenham balanco, no minimo, igual a zero
        this.enderecosBalanco[enderecoDisponivel.endereco] = this.enderecosBalanco[enderecoDisponivel.endereco] || 0;
      });

      // notifica fim da carga dos enderecos
      result$.next(true);
      result$.complete();
    });

    // retorna controle de processamento executado
    return result$;
  }

  /**
   * Evento disparado quando for alterado o endereco de destino ou o valor informado para o endereco de destino.
   */
  atualizarTotalInformado(){
    // total de enderecos destino selecionados
    let totalEnderecosDestinoLocal = 0;

    // total informado
    let totalInformadoLocal = 0;

    // TODO refatorar em funcao da construcao do formulario
    for(let indice = 0; indice < 10; indice++){
      // recupera o controle reponsavel pelo endereco de destino
      let endereco_destino = this.novaTransacaoForm.controls['endereco_destino_'+ indice];

      // consiste endereco selecionado
      if(endereco_destino.value === true){
        // atualiza o total de enderecos de destino selecionados
        totalEnderecosDestinoLocal++;

        // recupera o controle reponsavel pelo valor informado
        let valor = this.novaTransacaoForm.controls['valor_'+ indice];
        
        // consiste valor invalido
        if(isNaN(parseInt(valor.value, 10))){
          // sendo o valor invalido, redefine-o como um valor valido - neste caso, zerado
          valor.setValue(0);
        }
        
        // atualiza o total informado com o valor informado para o endereco de destino
        totalInformadoLocal += parseInt(valor.value, 10);
      }
    }

    // recupera o controle reponsavel pela taxa do minerador
    let valor = this.novaTransacaoForm.controls['taxa'];

    // consiste taxa valido
    if(!isNaN(parseInt(valor.value, 10))){
      // atualiza o total informado com o valor da taxa do minerador
      totalInformadoLocal += parseInt(valor.value, 10);
    }

    // atualiza o total de enderecos destino selecionados
    this.totalEnderecosDestino = totalEnderecosDestinoLocal;

    // atualiza o total informado
    this.totalInformado = totalInformadoLocal;
  }

  /**
   * Evento disparado quando for solicitado salvar a nova transacao.
   */
  salvarNovaTransacao(){
    // nova transacao contendo os dados informados
    const novaTransacao: TransacaoModel = new TransacaoModel();

    // entradas
    novaTransacao.entradas = [];
    novaTransacao.entradas.push({
      endereco: this.enderecoOrigem.endereco,
      valor: this.enderecosBalanco[ this.enderecoOrigem.endereco ],
    });

    // saidas
    novaTransacao.saidas = [];

    // TODO refatorar em funcao da construcao do formulario
    for(let indice = 0; indice < 10; indice++){
      // recupera o controle reponsavel pelo endereco de destino
      let endereco_destino = this.novaTransacaoForm.controls['endereco_destino_'+ indice];

      // consiste endereco selecionado
      if(endereco_destino.value === true){
        // recupera o controle reponsavel pelo valor informado
        let valor = this.novaTransacaoForm.controls['valor_'+ indice];

        novaTransacao.saidas.push({
          endereco: this.enderecosDisponiveis[indice].endereco,
          valor: parseInt(valor.value, 10) || 0,
          troco: this.enderecosDisponiveis[indice].endereco === this.enderecoOrigem.endereco,
        });
      }
    }

    // taxa do minerador
    novaTransacao.valorTaxa = parseInt(this.novaTransacaoForm.controls.taxa.value, 10) || 0;

    // registra o nova transacao informada
    this.transacaoService.salvarNovaTransacao(novaTransacao);

    // notifica nova transacao informada
    this.activeModal.close(novaTransacao);
  }
}
