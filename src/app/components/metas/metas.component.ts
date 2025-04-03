import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../services/metas.service';
import { Meta } from '../../models/metas';
import { MetasListComponent } from './metas-list/metas-list.component';
import { MetasFormComponent } from './metas-form/metas-form.component';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [FormsModule, CommonModule, MetasListComponent, MetasFormComponent],
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit {
  metas: Meta[] = [];
  metaForm: Meta = {
    usuario: { id: 0 },
    descricao: '',
    valorObjetivo: 0,
    valorAtual: 0,
    dataInicio: '',
    dataTermino: '',
    status: ''
  };
  buscaId: number | null = null;
  usuarioId: number | null = null;
  metaEncontrada: Meta | null = null;
  metasEmAndamento: Meta[] = [];

  // Novo controle para modal
  showModal: boolean = false;

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.listMetas();
  }

  listMetas(): void {
    this.metaService.findAll().subscribe({
      next: (data) => {
        this.metas = data;
        console.log('Metas:', data);
      },
      error: (err) => console.error('Erro ao consultar metas:', err)
    });
  }

  getMetaById(): void {
    if(this.buscaId !== null) {
      this.metaService.findById(this.buscaId).subscribe({
        next: (data) => {
          this.metaEncontrada = data;
          console.log('Meta encontrada:', data);
        },
        error: (err) => console.error('Erro ao buscar meta por ID:', err)
      });
    }
  }

  searchMetasEmAndamento(): void {
    if(this.usuarioId !== null) {
      this.metaService.buscarMetasEmAndamento(this.usuarioId).subscribe({
        next: (data) => {
          this.metasEmAndamento = data;
          console.log('Metas em Andamento:', data);
        },
        error: (err) => console.error('Erro ao buscar metas em andamento:', err)
      });
    }
  }

  // Abre o modal para novo cadastro ou para editar, preenchendo o formulário
  openModal(meta?: Meta): void {
    if (meta) {
      this.metaForm = { ...meta };
    } else {
      this.metaForm = {
        usuario: { id: 0 },
        descricao: '',
        valorObjetivo: 0,
        valorAtual: 0,
        dataInicio: '',
        dataTermino: '',
        status: ''
      };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleFormSubmit(meta: Meta): void {
    if (meta.id) {
      this.updateMeta(meta.id, meta);
    } else {
      this.saveMeta(meta);
    }
    this.closeModal();
  }

  saveMeta(meta: Meta): void {
    this.metaService.save(meta).subscribe({
      next: (res) => {
        console.log('Meta salva:', res);
        this.listMetas();
      },
      error: (err) => console.error('Erro ao salvar meta:', err)
    });
  }

  updateMeta(id: number, meta: Meta): void {
    this.metaService.update(meta, id).subscribe({
      next: (res) => {
        console.log('Meta atualizada:', res);
        this.listMetas();
      },
      error: (err) => console.error('Erro ao atualizar meta:', err)
    });
  }

  deleteMeta(id: number): void {
    this.metaService.deleteById(id).subscribe({
      next: (res) => {
        console.log('Meta excluída:', res);
        this.listMetas();
      },
      error: (err) => console.error('Erro ao excluir meta:', err)
    });
  }
}
