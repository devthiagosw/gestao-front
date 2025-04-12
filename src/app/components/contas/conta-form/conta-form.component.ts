import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Conta } from '../../../models/conta';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conta-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.scss']
})
export class ContaFormComponent implements OnInit {
  @Input() conta!: Conta;
  @Output() formSubmit = new EventEmitter<Conta>();
  @Output() close = new EventEmitter<void>();

  usuarios: Usuario[] = [];
  modalRef?: NgbModalRef;

  constructor(
    private usuarioService: UsuarioService,
    private handler: GlobalHandlerService,
    private swal: SwalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (!this.conta) {
      this.conta = {
        id: 0,
        usuario: { id: 0 },
        nomeConta: '',
        tipoConta: 'CORRENTE',
        saldoInicial: 0,
        status: 'ATIVA'
      };
    }

    this.usuarioService.findAll().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => this.handler.tratarErro(err)
    });
  }

  trackById(index: number, item: Usuario) {
    return item.id;
  }

  abrirModalUsuario(template: any): void {
    this.modalRef = this.modalService.open(template, { size: 'md' });
  }

  selecionarUsuario(usuario: Usuario): void {
    if (usuario.id !== undefined) {
      this.conta.usuario = { id: usuario.id };
      this.modalRef?.close();
    }
  }

  getUsuarioSelecionado(): Usuario | undefined {
    return this.usuarios.find(u => u.id === this.conta.usuario.id);
  }

  onSubmit(): void {
    if (!this.conta.nomeConta.trim()) {
      this.swal.aviso('O nome da conta é obrigatório.');
      return;
    }
    if (!this.conta.usuario.id) {
      this.swal.aviso('Selecione um usuário.');
      return;
    }
    this.formSubmit.emit(this.conta);
  }

  onClose(): void {
    this.close.emit();
  }
}
