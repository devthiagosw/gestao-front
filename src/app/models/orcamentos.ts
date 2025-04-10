export class Orcamento {
  id?: number;
  usuario!: { id: number };
  categoria!: { id: number };
  valorLimite!: number;
  periodo!: string;
  dataCriacao!: string;

  constructor(init?: Partial<Orcamento>) {
    Object.assign(this, init);
  }
}