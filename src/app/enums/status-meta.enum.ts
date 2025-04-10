export enum StatusMeta {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA'
}

export const STATUS_META_LABELS: { [key in StatusMeta]: string } = {
  [StatusMeta.EM_ANDAMENTO]: 'Em andamento',
  [StatusMeta.CONCLUIDA]: 'Concluída',
  [StatusMeta.CANCELADA]: 'Cancelada'
};
