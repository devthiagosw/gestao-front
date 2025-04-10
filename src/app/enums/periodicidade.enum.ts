export enum Periodicidade {
  DIARIA = 'DIARIA',
  SEMANAL = 'SEMANAL',
  MENSAL = 'MENSAL',
  ANUAL = 'ANUAL'
}

export const PERIODICIDADE_LABELS: { [key in Periodicidade]: string } = {
  [Periodicidade.DIARIA]: 'Diária',
  [Periodicidade.SEMANAL]: 'Semanal',
  [Periodicidade.MENSAL]: 'Mensal',
  [Periodicidade.ANUAL]: 'Anual'
};
