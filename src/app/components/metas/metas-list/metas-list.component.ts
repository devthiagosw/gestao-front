import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '../../../models/metas';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // <-- Nova importação
import { MetasFormComponent } from '../metas-form/metas-form.component';
import { MetaService } from '../../../services/metas.service';

@Component({
	selector: 'app-metas-list',
	standalone: true,
	imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, // <-- Adicionado
    MetasFormComponent,
    
  ],
	templateUrl: './metas-list.component.html',
	styleUrls: ['./metas-list.component.scss']
})
export class MetasListComponent implements OnInit {
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
	showModal: boolean = false;
	displayedColumns: string[] = ['id', 'descricao', 'valorObjetivo', 'valorAtual', 'dataInicio', 'dataTermino', 'status', 'actions'];

	// NOVAS PROPRIEDADES DE BUSCA
	buscaId: number | null = null;
	usuarioId: number | null = null;
	metaEncontrada: Meta | null = null;
	metasEmAndamento: Meta[] = [];

	constructor(private metaService: MetaService) {}

	ngOnInit(): void {
		this.listMetas();
	}

	listMetas(): void {
		this.metaService.findAll().subscribe({
			next: (data) => this.metas = data,
			error: (err) => console.error('Erro:', err)
		});
	}

	// NOVOS MÉTODOS DE BUSCA
	getMetaById(): void {
		if (this.buscaId !== null) {
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
		if (this.usuarioId !== null) {
			this.metaService.buscarMetasEmAndamento(this.usuarioId).subscribe({
				next: (data) => {
					this.metasEmAndamento = data;
					console.log('Metas em Andamento:', data);
				},
				error: (err) => console.error('Erro ao buscar metas em andamento:', err)
			});
		}
	}

	openModal(meta?: Meta): void {
		if(meta) {
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
		if(meta.id) {
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
			error: (err) => console.error('Erro ao salvar:', err)
		});
	}

	updateMeta(id: number, meta: Meta): void {
		this.metaService.update(meta, id).subscribe({
			next: (res) => {
				console.log('Meta atualizada:', res);
				this.listMetas();
			},
			error: (err) => console.error('Erro ao atualizar:', err)
		});
	}

	deleteMeta(id: number): void {
		this.metaService.deleteById(id).subscribe({
			next: (res) => {
				console.log('Meta excluída:', res);
				this.listMetas();
			},
			error: (err) => console.error('Erro ao excluir:', err)
		});
	}
}
