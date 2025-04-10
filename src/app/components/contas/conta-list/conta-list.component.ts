import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContaService } from '../../../services/conta.service';
import { ContaFormComponent } from '../conta-form/conta-form.component';
import { Conta } from '../../../models/conta';



@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [FormsModule, CommonModule,ContaFormComponent],
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

  // Novo controle para modal
  showModal: boolean = false;

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.listContas();
  }

  listContas(): void {
    this.contaService.findAll().subscribe({
      next: (data) => {
        this.conta = data;
        console.log('Contas:', data);
      },
      error: (err) => console.error('Erro ao consultar conta:', err)
    });
  }

  getContaById(): void {
    if(this.buscaId !== null) {
      this.contaService.findById(this.buscaId).subscribe({
        next: (data) => {
          this.contaEncontrada = data;
          console.log('Conta encontrada:', data);
        },
        error: (err) => console.error('Erro ao buscar conta por ID:', err)
      });
    }
  }

 
  // Abre o modal para novo cadastro ou para editar, preenchendo o formulário
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
      next: (res) => {
        console.log('Conta salva:', res);
        this.listContas();
      },
      error: (err) => console.error('Erro ao salvar conta:', err)
    });
  }

  updateConta(id: number, conta: Conta): void {
    this.contaService.update(conta, id).subscribe({
      next: (res) => {
        console.log('Conta atualizada:', res);
        this.listContas();
      },
      error: (err) => console.error('Erro ao atualizar conta:', err)
    });
  }

  deleteConta(id: number): void {
    this.contaService.deleteById(id).subscribe({
      next: (res) => {
        console.log('Conta excluída:', res);
        this.listContas();
      },
      error: (err) => console.error('Erro ao excluir conta:', err)
    });
  }
}

