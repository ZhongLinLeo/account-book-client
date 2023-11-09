import { Top } from '@/pages/Dashboard/data';
import { Typography } from 'antd';

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
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '金额',
      dataIndex: 'fundsRecordBalance',
      key: 'fundsRecordBalance',
      width: '20%',
      render: (_, item) => {
        return (
          <Text strong type={props.expenditure ? 'danger' : 'success'}>
            {props.expenditure ? '-' : '+'}
            {item.fundsRecordBalance}
          </Text>
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
      dataIndex: 'fundsRecordTime',
      key: 'fundsRecordTime',
      render: (_, item) => {
        return <Text strong>{item.fundsRecordTime}</Text>;
      },
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
