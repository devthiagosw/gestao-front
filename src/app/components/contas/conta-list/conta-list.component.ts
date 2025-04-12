import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContaService } from '../../../services/conta.service';
import { ContaFormComponent } from '../conta-form/conta-form.component';
import { Conta } from '../../../models/conta';
import { SwalService } from '../../../services/swal.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [FormsModule, CommonModule, ContaFormComponent],
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.scss']
})
export class ContasListComponent implements OnInit {
  conta: Conta[] = [];
  contaForm: Conta = new Conta();
  buscaId: number | null = null;
  usuarioId: number | null = null;
  contaEncontrada: Conta | null = null;
  contaEmAndamento: Conta[] = [];

  showModal: boolean = false;

  constructor(
    private contaService: ContaService,
    private swal: SwalService,
    private handler: GlobalHandlerService
  ) {}

  ngOnInit(): void {
    this.listContas();
  }

  private novaConta(): Conta {
    return {
      id: 0,
      usuario: { id: 0 },
      nomeConta: "",
      tipoConta: "",
      saldoInicial: 0,
      status: ""
    };
  }

  listContas(): void {
    this.contaService.findAll().subscribe({
      next: (data) => this.conta = data,
      error: (err) => this.handler.tratarErro(err)
    });
  }

  getContaById(): void {
    if (this.buscaId !== null) {
      this.contaService.findById(this.buscaId).subscribe({
        next: (data) => this.contaEncontrada = data,
        error: (err) => this.handler.tratarErro(err)
      });
    }
  }

  openModal(conta?: Conta): void {
    if (conta) {
      this.contaForm = { ...conta };
    } else {
      this.contaForm = new Conta();
      this.contaForm.usuario = {id: 1}; 
      this.contaForm.nomeConta = "Conta Padrao";
      this.contaForm.tipoConta = "CORRENTE";
      this.contaForm.saldoInicial = 0;
      this.contaForm.status = "ATIVA";
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(conta: Conta): void {
    if (conta.id) {
      this.updateConta(conta.id, conta);
    } else {
      this.saveConta(conta);
    }
    this.closeModal();
  }

  saveConta(conta: Conta): void {
    console.log(conta);
    this.contaService.save(conta).subscribe({
      next: () => {
        this.swal.sucesso('Conta criada com sucesso!');
        this.listContas();
      },
      error: (err) => this.handler.tratarErro(err)
    });
  }

  updateConta(id: number, conta: Conta): void {
    this.contaService.update(conta, id).subscribe({
      next: () => {
        this.swal.sucesso('Conta atualizada com sucesso!');
        this.listContas();
      },
      error: (err) => this.handler.tratarErro(err)
    });
  }

  deleteConta(id: number): void {
    this.swal.confirmar('Tem certeza que deseja excluir esta conta?').then((res) => {
      if (res.isConfirmed) {
        this.contaService.deleteById(id).subscribe({
          next: () => {
            this.swal.sucesso('Conta excluída com sucesso!');
            this.listContas();
          },
          error: (err) => this.handler.tratarErro(err)
        });
      }
    });
  }
}
