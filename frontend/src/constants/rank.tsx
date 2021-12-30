// eslint-disable-next-line no-shadow
export enum RANK {
  SECRET = 'SECRET',
  SSS = 'SSS',
  SS = 'SS',
  S = 'S',
  AAA = 'AAA',
  AA = 'AA',
  A = 'A',
  B = 'B',
  C = 'C',
  UNKNOWN = '?',
}

export const RANK_ORDER = Object.values(RANK);

export const rankRanges = (): Array<{ [key: string]: string }> => {
  const ranks: Array<{ [key: string]: string }> = [];

  // TODO: The following code needs to be rewritten to be simpler.
  ranks.push({ label: 'All', value: '' });
  ranks.push({ label: 'SSS', value: 'SSS' });
  ranks.push({ label: 'SSS-SS', value: 'SSS, SS' });
  ranks.push({ label: 'SSS-S', value: 'SSS, SS, S' });
  ranks.push({ label: 'SSS-AAA', value: 'SSS, SS, S, AAA' });
  ranks.push({ label: 'SSS-AA', value: 'SSS, SS, S, AAA, AA' });
  ranks.push({ label: 'SSS-A', value: 'SSS, SS, S, AAA, AA, A' });
  ranks.push({ label: 'SSS-B', value: 'SSS, SS, S, AAA, AA, A, B' });

  return ranks;
};
