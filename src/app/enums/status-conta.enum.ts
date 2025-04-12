export enum StatusConta {
  ATIVA = 'ATIVA',
  INATIVA = 'INATIVA',
  BLOQUEADA = 'BLOQUEADA'
}

export const STATUS_CONTA_LABELS: { [key in StatusConta]: string } = {
  [StatusConta.ATIVA]: 'Ativa',
  [StatusConta.INATIVA]: 'Inativa',
  [StatusConta.BLOQUEADA]: 'Bloqueada'
};
