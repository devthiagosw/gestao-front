import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Orcamento } from '../../../models/orcamentos';
import { OrcamentoService } from '../../../services/orcamentos.service';
import { UsuarioService } from '../../../services/usuarios.service';
import { GlobalHandlerService } from '../../../services/global-handler.service';
import { SwalService } from '../../../services/swal.service';
import { OrcamentosFormComponent } from '../orcamentos-form/orcamentos-form.component';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
	selector: 'app-orcamentos-list',
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
	templateUrl: './orcamentos-list.component.html',
	styleUrls: ['./orcamentos-list.component.scss']
})
export class OrcamentosListComponent implements OnInit {
	orcamentos: Orcamento[] = [];
	usuarios: any[] = [];
	categorias: any[] = [];
	buscaId: number | null = null;
	usuarioId: number | null = null;
	categoriaId: number | null = null;
	orcamentoEncontrado: Orcamento | null = null;
	orcamentosPorUsuario: Orcamento[] = [];
	orcamentosPorCategoria: Orcamento[] = [];

	displayedColumns = [
		'id', 'usuarioId', 'categoriaId', 'valorLimite',
		'periodo', 'dataCriacao', 'actions'
	];

	@ViewChild('modalUsuario') modalUsuarioTpl!: TemplateRef<any>;
	@ViewChild('modalCategoria') modalCategoriaTpl!: TemplateRef<any>;
	@ViewChild('modalSelecionarOrcamento') modalSelecionarOrcamentoTpl!: TemplateRef<any>;

	private usuarioModalRef!: NgbModalRef;
	private categoriaModalRef!: NgbModalRef;
	private selecionarOrcamentoRef!: NgbModalRef;
	private formModalRef!: NgbModalRef;

	constructor(
		private orcamentoService: OrcamentoService,
		private usuarioService: UsuarioService,
		private categoriaService: CategoriaService,
		private handler: GlobalHandlerService,
		private swal: SwalService,
		private modalService: NgbModal
	) { }

	ngOnInit(): void {
		this.listOrcamentos();
		this.loadUsuarios();
		this.loadCategorias();
	}

	listOrcamentos(): void {
		this.orcamentoService.findAll().subscribe({
			next: data => this.orcamentos = data,
			error: err => this.handler.tratarErro(err)
		});
	}

	loadUsuarios(): void {
		this.usuarioService.findAll().subscribe({
			next: data => this.usuarios = data,
			error: err => this.handler.tratarErro(err)
		});
	}
	loadCategorias(): void {
		this.categoriaService.findAll().subscribe({
			next: data => this.categorias = data,
			error: err => this.handler.tratarErro(err)
		});
	}


	searchOrcamentosByUsuarioId(): void {
		if (this.usuarioId !== null) {
			this.orcamentoService.findByUsuarioId(this.usuarioId).subscribe({
				next: data => this.orcamentosPorUsuario = data,
				error: err => this.handler.tratarErro(err)
			});
		}
	}

	searchOrcamentosByCategoriaId(): void {
		if (this.categoriaId !== null) {
			this.orcamentoService.findByCategoriaId(this.categoriaId).subscribe({
				next: data => this.orcamentosPorCategoria = data,
				error: err => this.handler.tratarErro(err)
			});
		}
	}

	abrirModalFormulario(orcamento?: Orcamento): void {
		this.formModalRef = this.modalService.open(OrcamentosFormComponent, { size: 'lg' });
		if (orcamento) {
			this.formModalRef.componentInstance.orcamento = { ...orcamento };
		}
		this.formModalRef.componentInstance.usuarios = this.usuarios;
		this.formModalRef.componentInstance.categorias = this.categorias;

		this.formModalRef.componentInstance.submitOrcamento.subscribe((o: Orcamento) => {
			const action = o.id
				? this.orcamentoService.update(o, o.id!)
				: this.orcamentoService.save(o);

			action.subscribe({
				next: () => {
					this.swal.sucesso(o.id ? 'Orcamento atualizado!' : 'Orcamento criado!');
					this.listOrcamentos();
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

	abrirModalCategoria(): void {
		this.categoriaModalRef = this.modalService.open(this.modalCategoriaTpl, { size: 'md' });
	}

	selecionarCategoria(c: any): void {
		this.categoriaId = c.id;
		this.categoriaModalRef.close();
	}


	selecionarOrcamento(m: Orcamento): void {
		this.buscaId = m.id!;
		this.selecionarOrcamentoRef.close();
	}

	trackById(_: number, item: any) {
		return item.id;
	}

	// /** Retorna a descrição da orcamento selecionado ou texto padrão */
	// getOrcamentoDescricaoSelecionado(): string {
	// 	const m = this.orcamentos.find(x => x.id === this.buscaId);
	// 	return m ? m.descricao : 'Nenhum selecionado';
	// }

	/** Retorna o nome do usuário selecionado ou texto padrão */
	getUsuarioNome(): string {
		const u = this.usuarios.find(x => x.id === this.usuarioId);
		return u ? u.nome : 'Nenhum usuário selecionado';
	}

	/** Retorna o nome da categoria selecionada ou texto padrão */
	getCategoriaNome(): string {
		const c = this.categorias.find(x => x.id === this.categoriaId);
		return c ? c.nomeCategoria : 'Nenhuma categoria selecionada';
	}

	deletar(id: number): void {
		this.swal.confirmar('Deseja excluir esta orcamento?').then(res => {
			if (res.isConfirmed) {
				this.orcamentoService.deleteById(id).subscribe({
					next: () => {
						this.swal.sucesso('Orcamento excluída!');
						this.listOrcamentos();
					},
					error: err => this.handler.tratarErro(err)
				});
			}
		});
	}
}
