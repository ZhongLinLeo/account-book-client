import { Top } from '@/pages/Dashboard/data';
import { Avatar, Typography } from 'antd';

import type { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import React from 'react';

const { Text } = Typography;

export type TopProps = {
  top: Partial<Top[]>;
  expenditure: boolean;
};

const TopsList: React.FC<TopProps> = (props) => {
  const columns: ProColumns<Top>[] = [
    {
      title: '金额',
      dataIndex: 'fundsRecordBalance',
      key: 'fundsRecordBalance',
      width: '30%',
      render: (_, item, index) => {
        return (
          <>
            <Avatar style={{ backgroundColor: '#108ee9' }}>{index + 1}</Avatar>
            <Text strong type={props.expenditure ? 'danger' : 'success'}>
              &nbsp;&nbsp;&nbsp;{props.expenditure ? '-' : '+'} {item.fundsRecordBalance}
            </Text>
          </>
        );
      },
    },
    {
      title: '描述',
      ellipsis: true,
      dataIndex: 'fundsRecordDescribe',
      key: 'fundsRecordDescribe',
      width: '30%',
    },
    {
      title: '时间',
      ellipsis: true,
      dataIndex: 'fundsRecordTime',
      key: 'fundsRecordTime',
    },
  ];

  return (
    <ProTable<Top>
      showHeader={false}
      options={{ density: false, setting: false, reload: false }}
      search={false}
      columns={columns}
      dataSource={props.top}
      size={'small'}
      pagination={false}
    />
  );
};
export default TopsList;
