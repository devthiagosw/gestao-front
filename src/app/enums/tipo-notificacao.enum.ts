export enum TipoNotificacao {
  VENCIMENTO = 'VENCIMENTO',
  META = 'META',
  ALERTA_DESPESA = 'ALERTA_DESPESA'
}

export const TIPO_NOTIFICACAO_LABELS: { [key in TipoNotificacao]: string } = {
  [TipoNotificacao.VENCIMENTO]: 'Vencimento',
  [TipoNotificacao.META]: 'Meta',
  [TipoNotificacao.ALERTA_DESPESA]: 'Alerta de Despesa'
};
