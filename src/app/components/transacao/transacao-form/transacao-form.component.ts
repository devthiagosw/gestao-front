import { Component, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Transacao } from '../../../models/transacao';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { EventEmitter } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { Conta } from '../../../models/conta';
import { Categoria } from '../../../models/categoria';
import { Tag } from '../../../models/tag';
import { ContaService } from '../../../services/conta.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './transacao-form.component.html',
  styleUrls: ['./transacao-form.component.scss']
})
export class TransacaoFormComponent {
  @Input() transacao!: Transacao;
  @Input() contas: Conta[] = [];
  @Input() categorias: Categoria[] = [];
  @Input() tags: Tag[] = [];
  @Input() usuarios: Usuario[] = [];
  @Output() submitTransacao = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();


  modalRef?: NgbModalRef;
  constructor(
    private usuarioService: UsuarioService,
    private handler: GlobalHandlerService,
    private swal: SwalService,
    private modalService: NgbModal,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private tagService: TagService) { }

  ngOnInit(): void {
    if (!this.transacao.conta) this.transacao.conta = { id: 0 };
    if (!this.transacao.categoria) this.transacao.categoria = { id: 0 };
    if (!this.transacao.usuario) this.transacao.usuario = { id: 0 };
    if (!this.transacao.tipo) this.transacao.tipo = 'SAIDA';

    // Carregar contas
    this.contaService.findAll().subscribe({
      next: contas => this.contas = contas,
      error: err => this.handler.tratarErro(err)
    });

    // Carregar categorias
    this.categoriaService.findAll().subscribe({
      next: categorias => this.categorias = categorias,
      error: err => this.handler.tratarErro(err)
    });

    // Carregar tags
    this.tagService.findAll().subscribe({
      next: tags => this.tags = tags,
      error: err => this.handler.tratarErro(err)
    });
  }

  onSubmit(): void {
    // Validação mínima
    if (!this.transacao.descricao.trim()) {
      this.swal.aviso('A descrição é obrigatória.');
      return;
    }
    if (!this.transacao.usuario.id) {
      this.swal.aviso('Selecione um usuário.');
      return;
    }
    if (!this.transacao.conta.id) {
      this.swal.aviso('Selecione uma conta.');
      return;
    }
    if (!this.transacao.categoria.id) {
      this.swal.aviso('Selecione uma categoria.');
      return;
    }

    // Construção do objeto no formato esperado pelo backend
    const transacaoLimpa = {
      usuario: { id: this.transacao.usuario.id },
      conta: { id: this.transacao.conta.id },
      categoria: { id: this.transacao.categoria.id },
      tipo: this.transacao.tipo,
      descricao: this.transacao.descricao,
      valor: this.transacao.valor,
      formaPagamento: this.transacao.formaPagamento
    };

    // Emissão do evento para salvar a transação
    console.log("Transação Limpa: ", transacaoLimpa);
    this.submitTransacao.emit(transacaoLimpa);
  }


  onClose(): void {
    this.close.emit();
  }

  abrirModalUsuario(template: any): void {
    this.modalRef = this.modalService.open(template, { size: 'md' });
  }

  selecionarUsuario(usuario: Usuario): void {
    if (usuario.id !== undefined) {
      this.transacao.usuario = { id: usuario.id };
      this.modalRef?.close();
    }
  }

  getUsuarioSelecionado(): Usuario | undefined {
    return this.usuarios.find(u => u.id === this.transacao.usuario.id);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  abrirModalConta(template: any): void {
    this.modalRef = this.modalService.open(template, { size: 'md' });
  }

  selecionarConta(conta: Conta): void {
    if (conta.id !== undefined) {
      this.transacao.conta = { id: conta.id };
      this.modalRef?.close();
    }
  }

  getContaSelecionada(): Conta | undefined {
    return this.contas.find(c => c.id === this.transacao.conta.id);
  }

  abrirModalCategoria(template: any): void {
    this.modalRef = this.modalService.open(template, { size: 'md' });
  }

  selecionarCategoria(categoria: Categoria): void {
    if (categoria.id !== undefined) {
      this.transacao.categoria = { id: categoria.id };
      this.modalRef?.close();
    }
  }

  getCategoriaSelecionada(): Categoria | undefined {
    return this.categorias.find(cat => cat.id === this.transacao.categoria.id);
  }

  // abrirModalTag(template: any): void {
  //   this.modalRef = this.modalService.open(template, { size: 'md' });
  // }

  // selecionarTag(tag: Tag): void {
  //   if (tag.id !== undefined) {
  //     if (!this.transacao.tag) {
  //       this.transacao.tag = [];
  //     }
  //     this.transacao.tag.push(tag);
  //     this.modalRef?.close();
  //   }
  // }

  // removerTag(tag: Tag): void {
  //   this.transacao.tag = this.transacao.tag?.filter(t => t.id !== tag.id);
  // }

  // getTagsSelecionadas(): Tag[] {
  //   return this.transacao.tag || [];
  // }
}
