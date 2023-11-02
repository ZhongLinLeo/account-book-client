export type ClassifyInfo = {
  classifyId: string;
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
  createTime: Date;
};

export type TableListPagination = {
  totalSize: number;
  pageSize: number;
  pageNumber: number;
};
