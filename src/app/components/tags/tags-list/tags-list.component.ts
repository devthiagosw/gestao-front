import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Tag } from '../../../models/tag';
import { TagService } from '../../../services/tag.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { TagsFormComponent } from '../tags-form/tags-form.component';

@Component({
  selector: 'app-tags-list',
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
    TagsFormComponent
  ],
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = [];
  buscaId: number | null = null;
  tagEncontrada: Tag | null = null;

  displayedColumns = ['id', 'nome', 'actions'];

  @ViewChild('modalSelecionarTag') modalSelecionarTagTpl!: TemplateRef<any>;
  private selecionarTagRef!: NgbModalRef;
  private formModalRef!: NgbModalRef;

  constructor(
    private tagService: TagService,
    private handler: GlobalHandlerService,
    private swal: SwalService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listTags();
  }

  listTags(): void {
    this.tagService.findAll().subscribe({
      next: data => this.tags = data,
      error: err => this.handler.tratarErro(err)
    });
  }

  getTagById(): void {
    if (this.buscaId !== null) {
      this.tagService.findById(this.buscaId).subscribe({
        next: data => this.tagEncontrada = data,
        error: err => this.handler.tratarErro(err)
      });
    }
  }

  openModal(tag?: Tag): void {
    this.formModalRef = this.modalService.open(TagsFormComponent, { size: 'lg' });
    this.formModalRef.componentInstance.tag = tag ? { ...tag } : { nome: '' };
    this.formModalRef.componentInstance.submitTag.subscribe((t: Tag) => {
      if (t.id) {
        this.tagService.update(t.id, t).subscribe({
          next: () => {
            this.swal.sucesso('Tag atualizada com sucesso!');
            this.listTags();
          },
          error: err => this.handler.tratarErro(err)
        });
      } else {
        this.tagService.create(t).subscribe({
          next: () => {
            this.swal.sucesso('Tag criada com sucesso!');
            this.listTags();
          },
          error: err => this.handler.tratarErro(err)
        });
      }
      this.formModalRef.close();
    });
    this.formModalRef.componentInstance.close.subscribe(() => this.formModalRef.close());
  }

  deleteTag(id: number): void {
    this.swal.confirmar('Tem certeza que deseja excluir esta tag?').then(res => {
      if (res.isConfirmed) {
        this.tagService.deleteById(id).subscribe({
          next: () => {
            this.swal.sucesso('Tag excluída com sucesso!');
            this.listTags();
          },
          error: err => this.handler.tratarErro(err)
        });
      }
    });
  }

  abrirModalSelecionarTag(): void {
    this.selecionarTagRef = this.modalService.open(this.modalSelecionarTagTpl, { size: 'md' });
  }

  selecionarTag(t: Tag): void {
    this.buscaId = t.id!;
    this.selecionarTagRef.close();
  }

  /** Exibe o nome da tag selecionada ou texto padrão */
  getTagNomeSelecionada(): string {
    const t = this.tags.find(x => x.id === this.buscaId);
    return t ? t.nome : 'Nenhum selecionado';
  }

  trackById(_: number, item: Tag) {
    return item.id;
  }
}
