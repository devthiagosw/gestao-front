import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Orcamento } from '../../../models/orcamentos';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // <-- Nova importação
import { OrcamentosFormComponent } from '../orcamentos-form/orcamentos-form.component';
import { OrcamentoService } from '../../../services/orcamentos.service';

@Component({
	selector: 'app-orcamentos-list',
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
		OrcamentosFormComponent,

	],
	templateUrl: './orcamentos-list.component.html',
	styleUrls: ['./orcamentos-list.component.scss']
})
export class OrcamentosListComponent implements OnInit {
	orcamentos: Orcamento[] = [];
	orcamentoForm: Orcamento = {
		usuario: { id: 0 },
		categoria: { id: 0 },
		valorLimite: 0,
		periodo: '',
		dataCriacao: '',
	};
	showModal: boolean = false;
	displayedColumns: string[] = ['id', 'usuarioId', 'categoriaId', 'valorLimite', 'periodo', 'dataCriacao', 'actions']; // <-- Corrigido

	// NOVAS PROPRIEDADES DE BUSCA
	buscaId: number | null = null;
	usuarioId: number | null = null;
	categoriaId: number | null = null;
	orcamentoEncontrado: Orcamento | null = null;
	orcamentosPorUsuario: Orcamento[] = [];

	constructor(private orcamentoService: OrcamentoService) { }

	ngOnInit(): void {
		this.listOrcamentos();
	}

	listOrcamentos(): void {
		this.orcamentoService.findAll().subscribe({
			next: (data) => this.orcamentos = data,
			error: (err) => console.error('Erro:', err)
		});
	}

	// NOVOS MÉTODOS DE BUSCA
	getOrcamentoById(): void {
		if (this.buscaId !== null) {
			this.orcamentoService.findById(this.buscaId).subscribe({
				next: (data) => {
					this.orcamentoEncontrado = data;
					console.log('Orcamento encontrado:', data);
				},
				error: (err) => console.error('Erro ao buscar orcamento por ID:', err)
			});
		}
	}

	searchOrcamentosPorUsuario(): void {
		if (this.usuarioId !== null) {
			this.orcamentoService.findByUsuarioId(this.usuarioId).subscribe({
				next: (data) => {
					this.orcamentosPorUsuario = data;
					console.log('Orcamentos encontrados por Usuario:', data);
				},
				error: (err) => console.error('Erro ao buscar orcamentos por usuario:', err)
			});
		}
	}

	searchOrcamentosPorUsuarioECategoria(): void {
		if (this.usuarioId !== null && this.categoriaId !== null) {
			this.orcamentoService.findByUsuarioIdAndCategoriaId(this.usuarioId, this.categoriaId).subscribe({
				next: (data) => {
					this.orcamentosPorUsuario = data;
					console.log('Orcamentos encontrados por Usuario e Categoria:', data);
				},
				error: (err) => console.error('Erro ao buscar orcamentos por usuario e categoria:', err)
			});
		}
	}

	openModal(orcamento?: Orcamento): void {
		if (orcamento) {
			this.orcamentoForm = { ...orcamento };
		} else {
			this.orcamentoForm = {
				usuario: { id: 0 },
				categoria: { id: 0 },
				valorLimite: 0,
				periodo: '',
				dataCriacao: '',
			};
		}
		this.showModal = true;
	}

	closeModal(): void {
		this.showModal = false;
	}

	handleFormSubmit(orcamento: Orcamento): void {
		if (orcamento.id) {
			this.updateOrcamento(orcamento.id, orcamento);
		} else {
			this.saveOrcamento(orcamento);
		}
		this.closeModal();
	}

	saveOrcamento(orcamento: Orcamento): void {
		this.orcamentoService.save(orcamento).subscribe({
			next: (res) => {
				console.log('Orcamento salva:', res);
				this.listOrcamentos();
			},
			error: (err) => console.error('Erro ao salvar:', err)
		});
	}

	updateOrcamento(id: number, orcamento: Orcamento): void {
		this.orcamentoService.update(orcamento, id).subscribe({
			next: (res) => {
				console.log('Orcamento atualizado:', res);
				this.listOrcamentos();
			},
			error: (err) => console.error('Erro ao atualizar:', err)
		});
	}

	deleteOrcamento(id: number): void {
		this.orcamentoService.deleteById(id).subscribe({
			next: (res) => {
				console.log('Orcamento excluída:', res);
				this.listOrcamentos();
			},
			error: (err) => console.error('Erro ao excluir:', err)
		});
	}
}
