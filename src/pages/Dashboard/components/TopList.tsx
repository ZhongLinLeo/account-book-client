import { Top } from '@/pages/Dashboard/data';
import { Popover, Table, Typography } from 'antd';

import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

export type TopProps = {
  top: Partial<Top[]>;
  type: boolean;
};

const TopsList: React.FC<TopProps> = (props) => {
  const columns: ColumnsType<Top> = [
    {
      title: '金额',
      dataIndex: 'fundsRecordBalance',
      key: 'fundsRecordBalance',
      width: '60%',
      render: (_, item) => {
        return (
          <Text strong type={props.type ? 'danger' : 'success'}>
            {props.type ? '-' : '+'}
            {item.fundsRecordBalance}
          </Text>
        );
      },
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
    <Table
      showHeader={false}
      columns={columns}
      dataSource={props.top}
      size={'small'}
      pagination={false}
    />
  );
};
export default TopsList;
