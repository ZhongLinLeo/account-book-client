export type FundsRecordItem = {
  fundsRecordId: string;
  fundsRecordBalance: number;
  fundsRecordTime: Date;
  fundsRecordDescribe: string;
  fundsRecordRemark: string;
  fundsRecordClassifyId: string;
  fundsAccountId: string;
  fundsUserId: string;
};

export type FundsRecordPagination = {
  totalSize: number;
  pageSize: number;
  pageNumber: number;
};
