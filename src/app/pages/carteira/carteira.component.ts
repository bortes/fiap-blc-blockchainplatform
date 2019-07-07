import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NovoEnderecoComponent } from '../../components/carteira/novo-endereco/novo-endereco.component';
import { EnderecoModel } from '../../models/endereco.model';
import { CarteiraService } from '../../services/carteira.service';

/**
 * Componente responsavel por exibir a pagina com os dados da carteira.
 */
@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {
  // lista de enderecos do minerador
  public enderecosMinerador: EnderecoModel[];

  // lista de enderecos da carteira
  public enderecosCarteira: EnderecoModel[];

  constructor(
    private modalService: NgbModal,
    private carteiraService: CarteiraService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // atualiza as listas de enderecos
    this.listarEnderecosMinerador();
    this.listarEnderecosCarteira();
  }

  /**
   * Evento disparado quando for solicitado a inclusao de um novo endereco.
   */
  onNovoEndereco() {
    // carrega e recuperada referencia da modal
    let modal = this.modalService.open(NovoEnderecoComponent, {
      centered: true,
    });

    // defini tratamentos que serao executados apos o fechamento da modal
    modal.result
      .then(novoEndereco => {
        // atualiza a lista de enderecos da carteira
        this.listarEnderecosCarteira();
      })
      .finally(() => {
      });
  }

  /**
   * Lista os enderecos cadastrados para o minerador.
   */
  private listarEnderecosMinerador() {
    // recupera a lista de enderecos
    this.carteiraService
      .listarEnderecosMinerador()
      .subscribe(enderecos => {
        this.enderecosMinerador = enderecos;
      });
  }

  /**
   * Lista os enderecos cadastrados para a carteira.
   */
  private listarEnderecosCarteira() {
    // recupera a lista de enderecos
    this.carteiraService
      .listarEnderecosCarteira()
      .subscribe(enderecos => {
        this.enderecosCarteira = enderecos;
      });    
  }
}
