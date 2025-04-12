
export class Meta {
  id?: number;
  usuario!: { id: number };
  descricao!: string;
  valorObjetivo!: number;
  valorAtual!: number;
  dataInicio!: string;
  dataTermino!: string;
  status!: string;

  constructor(init?: Partial<Meta>) {
    Object.assign(this, init);
  }
}


