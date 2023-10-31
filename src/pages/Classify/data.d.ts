export type TableListItem = {
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

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
