import { Categoria } from "./categoria";
import { Conta } from "./conta";
import { Tag } from "./tag";
import { Usuario } from "./usuario";

export class Transacao {
  id?: number;
  usuario!: Partial<Usuario>;
  conta!: Partial<Conta>;
  categoria!: Partial<Categoria>;
  dataTransacao?: string; // ISO string, como vem do LocalDateTime no back
  tipo!: 'ENTRADA' | 'SAIDA'; // baseado no enum TipoTransacao
  descricao!: string;
  valor!: number;
  formaPagamento?: string;
  parcelaAtual?: number;
  transacaoRecorrente?: { id: number }; // pode ser null
  tag?: Partial<Tag>[] // lista de tags relacionadas

  constructor(init?: Partial<Transacao>) {
    Object.assign(this, init);
  }
}
