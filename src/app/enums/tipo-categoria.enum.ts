export enum TipoCategoria {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA'
}

export const TIPO_CATEGORIA_LABELS: { [key in TipoCategoria]: string } = {
  [TipoCategoria.RECEITA]: 'Receita',
  [TipoCategoria.DESPESA]: 'Despesa'
};
