export class Conta {
  id!: number;
  usuario!: { id: number;};
  nomeConta!: string;
  tipoConta!: string;
  saldoInicial!: number;
  dataCriacao?: string ;
  status!: string;
}
