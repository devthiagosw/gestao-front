import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/login.service';
import { Usuario } from '../../auth/usuario';
import { MetaService } from '../../services/metas.service';
import { Meta } from '../../models/metas';
import { GlobalHandlerService } from '../../services/global-handler.service';

declare var Chart: any;

// Interface para tipar o contexto do tooltip do Chart.js
interface ChartTooltipContext {
  chart: any;
  tooltip: any;
  dataIndex: number;
  dataset: any;
  datasetIndex: number;
  element: any;
  label: string;
  parsed: any;
  raw: number;
  formattedValue: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  LoginService = inject(LoginService);
  metaService = inject(MetaService);
  handler = inject(GlobalHandlerService);
  
  @ViewChild('metasChart') metasChartRef!: ElementRef<HTMLCanvasElement>;
  
  usuario!: Usuario;
  metas: Meta[] = [];
  metasChart: any;

  constructor() {
    this.usuario = this.LoginService.getUserLogado();
    console.log('Usuário logado:', this.usuario);
  }
  
  ngOnInit(): void {
    if (this.LoginService.hasRole('USER') || this.LoginService.hasRole('ADMIN')) {
      this.carregarMetas();
    }
  }

  ngAfterViewInit(): void {
    // Chart será inicializado após os dados serem carregados
  }

  carregarMetas(): void {
    console.log('Iniciando carregamento de metas...');
    const userLogado = this.LoginService.getUserLogado();
    console.log('Dados do usuário logado:', userLogado);
    
    // Função para tratar os dados das metas
    const processarMetas = (data: Meta[]) => {
      console.log('Dados recebidos do backend:', data);
      this.metas = data || [];
      console.log('Metas processadas:', this.metas);
      
      // Atualizar o dashboard somente se houver metas
      if (this.metas && this.metas.length > 0) {
        setTimeout(() => {
          this.inicializarGraficoPizza();
        }, 500); // Tempo aumentado para garantir que o DOM esteja pronto
      } else {
        console.log('Nenhuma meta encontrada para exibição');
      }
    };

    if (userLogado && userLogado.id) {
      console.log('Buscando metas em andamento para o usuário ID:', userLogado.id);
      this.metaService.buscarMetasEmAndamento(userLogado.id).subscribe({
        next: (data) => {
          console.log('Resposta do endpoint de metas em andamento:', data);
          processarMetas(data);
        },
        error: (err) => {
          console.error('Erro ao buscar metas em andamento:', err);
          this.handler.tratarErro(err);
          // Em caso de falha, tenta buscar todas as metas
          this.carregarTodasMetas();
        }
      });
    } else {
      console.log('ID do usuário não disponível, buscando todas as metas');
      this.carregarTodasMetas();
    }
  }

  carregarTodasMetas(): void {
    console.log('Carregando todas as metas...');
    this.metaService.findAll().subscribe({
      next: (data) => {
        console.log('Todas as metas recebidas:', data);
        this.metas = data || [];
        if (this.metas.length > 0) {
          setTimeout(() => {
            this.inicializarGraficoPizza();
          }, 500);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar todas as metas:', err);
        this.handler.tratarErro(err);
      }
    });
  }

  inicializarGraficoPizza(): void {
    console.log('Inicializando o gráfico de pizza');
    if (!this.metasChartRef) {
      console.error('Elemento do gráfico não encontrado');
      return;
    }
    
    const canvas = this.metasChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Contexto 2D não disponível');
      return;
    }
    
    // Destruir o gráfico existente se houver
    if (this.metasChart) {
      this.metasChart.destroy();
    }
    
    // Calcular dados para o gráfico
    const dadosGrafico = this.metas.map(meta => {
      const percentual = (meta.valorAtual / meta.valorObjetivo) * 100;
      return {
        meta: meta,
        percentual: percentual,
        faltante: 100 - percentual
      };
    });
    
    // Cores vibrantes para o gráfico
    const cores = [
      { bg: 'rgba(54, 179, 126, 0.8)', border: 'rgb(36, 148, 100)' },
      { bg: 'rgba(54, 162, 235, 0.8)', border: 'rgb(36, 130, 192)' },
      { bg: 'rgba(255, 146, 43, 0.8)', border: 'rgb(230, 126, 34)' },
      { bg: 'rgba(153, 102, 255, 0.8)', border: 'rgb(121, 80, 201)' },
      { bg: 'rgba(255, 107, 107, 0.8)', border: 'rgb(231, 73, 73)' }
    ];
    
    // Preparar dados para o gráfico
    const labels = this.metas.map(meta => meta.descricao);
    const datasets = [];
    
    // Criar dois conjuntos de dados - um para o progresso e outro para o que falta
    datasets.push({
      label: 'Progresso (%)',
      data: dadosGrafico.map(d => parseFloat(d.percentual.toFixed(1))),
      backgroundColor: dadosGrafico.map((_, i) => cores[i % cores.length].bg),
      borderColor: dadosGrafico.map((_, i) => cores[i % cores.length].border),
      borderWidth: 2
    });
    
    // Criar gráfico
    if (typeof Chart !== 'undefined') {
      try {
        this.metasChart = new Chart(ctx, {
          type: 'pie', // Usando gráfico de pizza conforme solicitado
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 12,
                    family: 'Roboto, sans-serif'
                  },
                  padding: 20
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context: ChartTooltipContext) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    const metaIndex = context.dataIndex;
                    const meta = dadosGrafico[metaIndex].meta;
                    
                    return [
                      `${label}: ${value.toFixed(1)}% concluído`,
                      `Atual: R$ ${meta.valorAtual.toFixed(2)}`,
                      `Objetivo: R$ ${meta.valorObjetivo.toFixed(2)}`
                    ];
                  }
                }
              }
            }
          }
        });
        console.log('Gráfico criado com sucesso');
      } catch (error) {
        console.error('Erro ao criar o gráfico:', error);
      }
    } else {
      console.error('Chart.js não está definido');
    }
  }
}
