import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BlocoModel } from '../../models/bloco.model';
import { BlocoService } from '../../services/bloco.service';
import { CarteiraService } from '../../services/carteira.service';
import { TransacaoService } from '../../services/transacao.service';

/**
 * Componente responsavel por exibir a pagina com os dados da cadeia de blocos.
 */
@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.scss']
})
export class BlocosComponent implements OnInit {
  // formulario para cadastro de nono bloco
  public blocosForm: FormGroup;

  // lista de blocos minerados
  public blocosMinerados: BlocoModel[];

  // controle utilizado para notificar mineracao em execucao
  public minerando: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private carteiraService: CarteiraService,
    private transacaoService: TransacaoService,
    private blocoService: BlocoService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // inicializa formulario para acesso como pessoa fisica
    this.blocosForm = this.formBuilder.group({
      // TODO refatorar para lista, porem lista sao sequencias - avaliar estrutura
      'nonce_0': ['', Validators.compose([Validators.required])],
      'nonce_1': ['', Validators.compose([Validators.required])],
      'nonce_2': ['', Validators.compose([Validators.required])],
      'nonce_3': ['', Validators.compose([Validators.required])],
      'nonce_4': ['', Validators.compose([Validators.required])],
    });

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
   * Atualiza o hash do bloco informado.
   */
  atualizarHashBloco(bloco: BlocoModel, indice: number){
    // TODO recuperar referencia para o controle
    bloco.nonce = this.blocosForm.controls['nonce_'+ indice].value;

    // calcular novo hash do bloco informado
    this.blocoService.atualizarHashBloco(bloco);
  }

  /**
   * Minera o bloco informado em busca do nonce que atesta a Prova de Trabalho do esforco empreendido.
   */
  minerarBloco(bloco: BlocoModel, indice: number, altura: number){
    // notificao mineracao em execucao
    this.minerando = true;

    // minera o bloco informado
    this.blocoService.minerarBloco(bloco, altura);

    // TODO recuperar referencia para o controle
    // atualiza nonce
    this.blocosForm.controls['nonce_'+ indice].setValue(bloco.nonce);

    // notificao fim na mineracao
    this.minerando = false;
  }
}
