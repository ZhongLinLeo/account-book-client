export type FundsOverview = {
  overview: Overview;
  yearOverview: Overview;
  monthOverview: Overview;
  weekOverview: Overview;
  assets: number;
  liabilities: number;
};

export type Overview = {
  income: number;
  expenditure: number;
};
