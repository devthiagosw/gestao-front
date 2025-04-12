import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Orcamento } from '../../../models/orcamentos';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-orcamentos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './orcamentos-form.component.html',
  styleUrls: ['./orcamentos-form.component.scss']
})
export class OrcamentosFormComponent implements OnInit {
  @Input() orcamento!: Orcamento;
  @Output() submitOrcamento = new EventEmitter<Orcamento>();
  @Output() close = new EventEmitter<void>();

  usuarios: Usuario[] = [];
  modalRefUsuario?: NgbModalRef;


  categorias: Categoria[] = [];
  modalRefCategoria?: NgbModalRef;

  constructor(
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private handler: GlobalHandlerService,
    private swal: SwalService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // Se não veio orcamento (nova), inicializa objeto padrão
    if (!this.orcamento) {
      this.orcamento = {
        usuario: { id: 0 },
        categoria: { id: 0 },
        valorLimite: 0,
        periodo: '',
      };
    }



    this.usuarioService.findAll().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => this.handler.tratarErro(err)
    });


    this.categoriaService.findAll().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => this.handler.tratarErro(err)
    });
  }

  trackById(index: number, item: Usuario | Categoria) {
    return item.id;
  }

  abrirModalUsuario(template: any): void {
    this.modalRefUsuario = this.modalService.open(template, { size: 'md' });
  }

  abrirModalCategoria(template: any): void {
    this.modalRefCategoria = this.modalService.open(template, { size: 'md' });
  }

  selecionarUsuario(usuario: Usuario): void {
    if (usuario.id !== undefined) {
      this.orcamento.usuario.id = usuario.id;
      this.modalRefUsuario?.close();
    }
  }

  getUsuarioSelecionado(): Usuario | undefined {
    return this.usuarios.find(u => u.id === this.orcamento.usuario.id);
  }


  selecionarCategoria(categoria: Categoria): void {
    if (categoria.id !== undefined) {
      this.orcamento.categoria.id = categoria.id;
      this.modalRefCategoria?.close();
    }
  }
  getCategoriaSelecionada(): Categoria | undefined {
    return this.categorias.find(u => u.id === this.orcamento.categoria.id);
  }


  onSubmit(): void {
    // validação mínima
    if (!this.orcamento.valorLimite) {
      this.swal.aviso('O valor limite é obrigatório.');
      return;
    }
    if (!this.orcamento.usuario.id) {
      this.swal.aviso('Selecione um usuário.');
      return;
    }
    if (!this.orcamento.categoria.id) {
      this.swal.aviso('Selecione uma categoria.');
      return;
    }
    this.submitOrcamento.emit(this.orcamento);
  }

  onClose(): void {
    this.close.emit();
  }
}
