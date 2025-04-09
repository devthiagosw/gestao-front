export interface Conta {
  id: number;
  usuario: { id: number;};
  nomeConta: string;
  tipoConta: string;
  saldoInicial: number;
  dataCriacao: string; // Use string ou Date, dependendo da forma como você processa a data no TypeScript
  status: string;
}
