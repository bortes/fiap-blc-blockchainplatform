import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CarteiraService } from '../../../services/carteira.service';
import { EnderecoModel } from '../../../models/endereco.model';

/**
 * Componente responsavel por exibir o cadastro de um novo endereco.
 */
@Component({
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.scss']
})
export class NovoEnderecoComponent implements OnInit {
  // formulario para cadastro de novo endereco
  public novoEnderecoForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder,
    private carteiraService: CarteiraService,
  ) { }

  /**
   * Evento disparado quando o componente for inicializado.
   */
  ngOnInit() {
    // inicializa formulario para acesso como pessoa fisica
    this.novoEnderecoForm = this.formBuilder.group({
      endereco: ['', Validators.compose([Validators.required])],
      rotulo: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Evento disparado quando for solicitada a geracao de um novo endereco.
   */
  gerarNovoEndereco(){
    // gera novo endereco
    this.novoEnderecoForm.controls.endereco.setValue(this.carteiraService.gerarNovoEndereco());
  }

  /**
   * Evento disparado quando for solicitado salvar o novo endereco.
   */
  salvarNovoEndereco(){
    // novo endereco contendo os dados informados
    const novoEndereco: EnderecoModel = {
      endereco: this.novoEnderecoForm.controls.endereco.value,
      rotulo: this.novoEnderecoForm.controls.rotulo.value,
    }

    // registra o novo endereco informado
    this.carteiraService.salvarNovoEndereco(novoEndereco);

    // notifica novo endereco informado
    this.activeModal.close(novoEndereco);
  }
}
