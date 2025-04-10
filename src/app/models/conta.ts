export class Conta {
  id!: number;
  usuario!: { id: number;};
  nomeConta!: string;
  tipoConta!: string;
  saldoInicial!: number;
  dataCriacao!: Date;
  status!: string;
}
