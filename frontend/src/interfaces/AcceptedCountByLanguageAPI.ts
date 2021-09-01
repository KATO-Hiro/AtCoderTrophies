export type AcceptedCount = {
  language: string;
  count: number;
  rank: number;
};

export type AcceptedCountByLanguageAPI = {
  languages: AcceptedCount[];
};
