export enum TipoConta {
  CORRENTE = 'CORRENTE',
  POUPANCA = 'POUPANCA',
  INVESTIMENTO = 'INVESTIMENTO'
}

export const TIPO_CONTA_LABELS: { [key in TipoConta]: string } = {
  [TipoConta.CORRENTE]: 'Corrente',
  [TipoConta.POUPANCA]: 'Poupança',
  [TipoConta.INVESTIMENTO]: 'Investimento'
};
