export enum StatusUsuario {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  SUSPENSO = 'SUSPENSO'
}

export const STATUS_USUARIO_LABELS: { [key in StatusUsuario]: string } = {
  [StatusUsuario.ATIVO]: 'Ativo',
  [StatusUsuario.INATIVO]: 'Inativo',
  [StatusUsuario.SUSPENSO]: 'Suspenso'
};
