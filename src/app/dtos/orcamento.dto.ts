export type OrcamentoDTO = {
    id?: number;
    valorLimite: number;
    periodo: string;
    usuario: { id: number };
    categoria: { id: number };
};