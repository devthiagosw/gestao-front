export class Transacao {
  id?: number;
  usuario!: { id: number };
  conta!: { id: number };
  categoria!: { id: number };
  dataTransacao?: string; // ISO string, como vem do LocalDateTime no back
  tipo!: 'ENTRADA' | 'SAIDA'; // baseado no enum TipoTransacao
  descricao!: string;
  valor!: number;
  formaPagamento?: string;
  parcelaAtual?: number;
  transacaoRecorrente?: { id: number }; // pode ser null
  tag?: { id: number }[]; // lista de tags relacionadas

  constructor(init?: Partial<Transacao>) {
    Object.assign(this, init);
  }
}
