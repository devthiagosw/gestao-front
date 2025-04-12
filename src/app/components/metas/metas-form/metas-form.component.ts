import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '../../../models/metas';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-metas-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './metas-form.component.html',
  styleUrls: ['./metas-form.component.scss']
})
export class MetasFormComponent implements OnInit {
  @Input() meta!: Meta;
  @Output() submitMeta = new EventEmitter<Meta>();
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
    // Se não veio meta (nova), inicializa objeto padrão
    if (!this.meta) {
      this.meta = {
        usuario: { id: 0 },
        descricao: '',
        valorObjetivo: 0,
        valorAtual: 0,
        dataInicio: '',
        dataTermino: '',
        status: ''
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
      this.meta.usuario = { id: usuario.id };
      this.modalRef?.close();
    }
  }

  getUsuarioSelecionado(): Usuario | undefined {
    return this.usuarios.find(u => u.id === this.meta.usuario.id);
  }

  onSubmit(): void {
    // validação mínima
    if (!this.meta.descricao.trim()) {
      this.swal.aviso('A descrição é obrigatória.');
      return;
    }
    if (!this.meta.usuario.id) {
      this.swal.aviso('Selecione um usuário.');
      return;
    }
    this.submitMeta.emit(this.meta);
  }

  onClose(): void {
    this.close.emit();
  }
}
