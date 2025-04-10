export enum TipoTransacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA'
}

export const TIPO_TRANSACAO_LABELS: { [key in TipoTransacao]: string } = {
  [TipoTransacao.ENTRADA]: 'Entrada',
  [TipoTransacao.SAIDA]: 'Saída'
};
