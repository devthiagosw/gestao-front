export interface Meta {
  id?: number;
  usuario: { id: number;};
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  dataInicio: string;
  dataTermino: string;
  status: string;
}
