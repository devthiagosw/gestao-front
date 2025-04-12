import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Transacao } from '../../../models/transacao';
import { TransacaoFormComponent } from '../transacao-form/transacao-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransacaoService } from '../../../services/transacao.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { UsuarioService } from '../../../services/usuarios.service';
import { SwalService } from '../../../services/swal.service';


@Component({
  selector: 'app-transacao-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './transacao-list.component.html',
  styleUrls: ['./transacao-list.component.scss']
})
export class TransacaoListComponent {
  transacoes: Transacao[] = [];
  usuarios: any[] = [];
  contas: any[] = [];
  categorias: any[] = [];
  tags: any[] = [];
  usuarioId: number | null = null;
  displayedColumns: string[] = ['id', 'descricao', 'tipo', 'valor', 'dataTransacao', 'actions'];

  @ViewChild('modalUsuario') modalUsuarioTpl!: TemplateRef<any>;

  private usuarioModalRef!: NgbModalRef;
  private formModalRef!: NgbModalRef;

  constructor(
    private usuarioService: UsuarioService,
    private swal: SwalService,
    private transacaoService: TransacaoService,
    private handler: GlobalHandlerService,
    private modalService: NgbModal) { }


  ngOnInit(): void {
    this.listTransacoes();
    this.loadUsuarios();
  }


  listTransacoes(): void {
    this.transacaoService.findAll().subscribe({
      next: data => this.transacoes = data,
      error: err => this.handler.tratarErro(err)
    });
  }


  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: data => this.usuarios = data,
      error: err => this.handler.tratarErro(err)
    });
  }

  abrirModalFormulario(transacao?: Transacao): void {
    this.formModalRef = this.modalService.open(TransacaoFormComponent);
    this.formModalRef.componentInstance.transacao = transacao ? { ...transacao } : new Transacao();
    this.formModalRef.componentInstance.contas = this.contas;
    this.formModalRef.componentInstance.categorias = this.categorias;
    this.formModalRef.componentInstance.tags = this.tags;
    this.formModalRef.componentInstance.usuarios = this.usuarios;

    this.formModalRef.componentInstance.submitTransacao.subscribe((novaTransacao: Transacao) => {
      this.transacaoService.save(novaTransacao).subscribe({
        next: (transacaoSalva) => {
          this.swal.sucesso('Transação salva com sucesso!');
          this.listTransacoes();
        },
        error: (err) => this.handler.tratarErro(err)
      });
      this.formModalRef.close();
    });

    this.formModalRef.componentInstance.close.subscribe(() => {
      this.formModalRef.close();
    });
  }

  deletar(id: number): void {
    this.transacoes = this.transacoes.filter(t => t.id !== id);
  }

  abrirModalUsuario(): void {
    this.usuarioModalRef = this.modalService.open(this.modalUsuarioTpl, { size: 'md' });
  }

  selecionarUsuario(usuario: any): void {
    this.usuarioId = usuario.id;
    this.usuarioModalRef.close();
  }

  getUsuarioNome(): string {
    const u = this.usuarios.find(x => x.id === this.usuarioId);
    return u ? u.nome : 'Nenhum selecionado';
  }

  buscarTransacoesPorUsuario(): void {
    if (!this.usuarioId) return;

    this.transacaoService.findByUsuarioId(this.usuarioId).subscribe({
      next: data => this.transacoes = data,
      error: err => this.handler.tratarErro(err)
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
