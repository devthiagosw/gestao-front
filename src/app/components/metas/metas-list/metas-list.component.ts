import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Meta } from '../../../models/metas';
import { MetaService } from '../../../services/metas.service';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { MetasFormComponent } from '../metas-form/metas-form.component';

@Component({
  selector: 'app-metas-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    FormsModule,
    NgbModalModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './metas-list.component.html',
  styleUrls: ['./metas-list.component.scss']
})
export class MetasListComponent implements OnInit {
  metas: Meta[] = [];
  usuarios: any[] = [];
  buscaId: number | null = null;
  usuarioId: number | null = null;
  metaEncontrada: Meta | null = null;
  metasEmAndamento: Meta[] = [];

  displayedColumns = [
    'id', 'descricao', 'valorObjetivo', 'valorAtual',
    'dataInicio', 'dataTermino', 'status', 'actions'
  ];

  @ViewChild('modalUsuario') modalUsuarioTpl!: TemplateRef<any>;
  @ViewChild('modalSelecionarMeta') modalSelecionarMetaTpl!: TemplateRef<any>;

  private usuarioModalRef!: NgbModalRef;
  private selecionarMetaRef!: NgbModalRef;
  private formModalRef!: NgbModalRef;

  constructor(
    private metaService: MetaService,
    private usuarioService: UsuarioService,
    private handler: GlobalHandlerService,
    private swal: SwalService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listMetas();
    this.loadUsuarios();
  }

  listMetas(): void {
    this.metaService.findAll().subscribe({
      next: data => this.metas = data,
      error: err => this.handler.tratarErro(err)
    });
  }

  loadUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: data => this.usuarios = data,
      error: err => this.handler.tratarErro(err)
    });
  }

  getMetaById(): void {
    if (this.buscaId !== null) {
      this.metaService.findById(this.buscaId).subscribe({
        next: data => this.metaEncontrada = data,
        error: err => this.handler.tratarErro(err)
      });
    }
  }

  searchMetasEmAndamento(): void {
    if (this.usuarioId !== null) {
      this.metaService.buscarMetasEmAndamento(this.usuarioId).subscribe({
        next: data => this.metasEmAndamento = data,
        error: err => this.handler.tratarErro(err)
      });
    }
  }

  abrirModalFormulario(meta?: Meta): void {
    this.formModalRef = this.modalService.open(MetasFormComponent, { size: 'lg' });
    if (meta) {
      this.formModalRef.componentInstance.meta = { ...meta };
    }
    this.formModalRef.componentInstance.usuarios = this.usuarios;

    this.formModalRef.componentInstance.submitMeta.subscribe((m: Meta) => {
      const action = m.id
        ? this.metaService.update(m, m.id!)
        : this.metaService.save(m);

      action.subscribe({
        next: () => {
          this.swal.sucesso(m.id ? 'Meta atualizada!' : 'Meta criada!');
          this.listMetas();
        },
        error: err => this.handler.tratarErro(err)
      });

      this.formModalRef.close();
    });

    this.formModalRef.componentInstance.close.subscribe(() => {
      this.formModalRef.close();
    });
  }

  abrirModalUsuario(): void {
    this.usuarioModalRef = this.modalService.open(this.modalUsuarioTpl, { size: 'md' });
  }

  selecionarUsuario(u: any): void {
    this.usuarioId = u.id;
    this.usuarioModalRef.close();
  }

  abrirModalSelecionarMeta(): void {
    this.selecionarMetaRef = this.modalService.open(this.modalSelecionarMetaTpl, { size: 'md' });
  }

  selecionarMeta(m: Meta): void {
    this.buscaId = m.id!;
    this.selecionarMetaRef.close();
  }

  trackById(_: number, item: any) {
    return item.id;
  }

  /** Retorna a descrição da meta selecionada ou texto padrão */
  getMetaDescricaoSelecionada(): string {
    const m = this.metas.find(x => x.id === this.buscaId);
    return m ? m.descricao : 'Nenhum selecionado';
  }

  /** Retorna o nome do usuário selecionado ou texto padrão */
  getUsuarioNome(): string {
    const u = this.usuarios.find(x => x.id === this.usuarioId);
    return u ? u.nome : 'Nenhum selecionado';
  }

  deletar(id: number): void {
    this.swal.confirmar('Deseja excluir esta meta?').then(res => {
      if (res.isConfirmed) {
        this.metaService.deleteById(id).subscribe({
          next: () => {
            this.swal.sucesso('Meta excluída!');
            this.listMetas();
          },
          error: err => this.handler.tratarErro(err)
        });
      }
    });
  }
}
