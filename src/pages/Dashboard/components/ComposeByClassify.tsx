import { FundsRecordPagination, FundsRecordResponse } from '@/pages/FundsRecord/data';
import React from 'react';

import { Compose } from '@/pages/Dashboard/data';
import { paginationRecords } from '@/pages/FundsRecord/service';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Avatar, Drawer, Popover } from 'antd';

export type ComposeByClassifyProps = {
  composeByClassify: Partial<FundsRecordResponse[]>;
  composeInfo: Compose;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const ComposeByClassify: React.FC<ComposeByClassifyProps> = (props) => {
  const columns: ProColumns<FundsRecordResponse>[] = [
    {
      title: '金额',
      hideInForm: true,
      dataIndex: 'fundsRecordBalance',
      width: '10%',
      search: false,
      align: 'right',
      render: (_, item) => {
        return (
          <Popover content={item.fundsRecordRemark}>
            <Text
              strong
              type={item.classifyInfo.classifyType === 0 ? 'danger' : 'success'}
              style={{ textAlign: 'right' }}
            >
              {item.classifyInfo.classifyType === 0 ? '-' : '+'}
              {item.fundsRecordBalance}
            </Text>
          </Popover>
        );
      },
    },
    {
      title: '时间',
      key: 'fundsRecordTime',
      dataIndex: 'fundsRecordTime',
      sorter: true,
      align: 'center',
      width: '25%',
      valueType: 'dateTimeRange',
      search: false,
      render: (_, item) => {
        return <Text strong>{item.fundsRecordTime}</Text>;
      },
    },
    {
      title: '描述',
      dataIndex: 'fundsRecordDescribe',
      search: false,
      width: '30%',
    },
    {
      title: '分类',
      dataIndex: 'classifyType',
      search: false,
      hideInTable: true,
    },
    {
      title: '账户信息',
      dataIndex: 'fundsAccountInfo',
      search: false,
      width: '20%',
      render: (_, item) => {
        return (
          <>
            <Avatar style={{ backgroundColor: '#108ee9' }}>{item.accountInfo.accountOwner}</Avatar>
            <Text strong>&nbsp;&nbsp;&nbsp;{item.accountInfo.accountName}</Text>
          </>
        );
      },
    },
  ];

  return (
    <Drawer
      title={props.composeInfo?.classifyName}
      placement="right"
      width={640}
      onClose={() => props.onOpenChange(false)}
      open={props.open}
    >
      <ProTable<FundsRecordResponse, FundsRecordPagination>
        rowKey="key"
        pagination={{
          pageSize: 10,
        }}
        request={paginationRecords}
        columns={columns}
        options={{ density: false, setting: false, reload: false }}
      />
    </Drawer>
  );
};
export default ComposeByClassify;
