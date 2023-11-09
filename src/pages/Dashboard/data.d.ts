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

export type FundsTrend = {
  fundsRecordDate: string;
  balance?: number;
  fundsType?: string;
};

export type FundsCompose = {
  incomeCompose: Compose[];
  expenditureCompose: Compose[];
};

export type Compose = {
  classifyName: string;
  percent: number;
};

export type FundsTop = {
  incomeTops: Top[];
  expenditureTops: Top[];
};

export type Top = {
  fundsRecordBalance: number;
  fundsRecordTime: Date;
  fundsRecordDescribe: string;
};
