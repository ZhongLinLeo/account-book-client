export type FinancialAccount = {
  accountId: string;
  accountName: string;
  accountDescribe: string;
  accountOwner: string;
  accountOwnershipId: string;
  accountBalance: number;
  accountIncome: number;
  accountExpenditure: number;
  accountType: 0 | 1;
};

export type AccountOperate = {
  accountId: number;
  targetAccountId: number;
  sourceAccountId: number;
  balance: number;
};
