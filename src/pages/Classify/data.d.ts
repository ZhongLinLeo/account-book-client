export type ClassifyInfo = {
  classifyId: string;
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
  createTime: Date;
  classifyIcon: string;
  defaultClassify: number;
  includeAnalyze: number;
};

export type TableListPagination = {
  totalSize: number;
  pageSize: number;
  pageNumber: number;
};
