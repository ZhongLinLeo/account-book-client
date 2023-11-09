import { Top } from '@/pages/Dashboard/data';
import { List } from 'antd';

import React from 'react';
import { ProCard } from '@ant-design/pro-components';

export type TopProps = {
  top: Partial<Top[]>;
};

const TopsList: React.FC<TopProps> = (props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.top}
      size="small"
      renderItem={(item, index) => (
        <ProCard split="vertical">
          <ProCard>{index}</ProCard>
          <ProCard>{item.fundsRecordBalance}</ProCard>
          <ProCard>{item.fundsRecordDescribe}</ProCard>
          <ProCard>{item.fundsRecordTime}</ProCard>
        </ProCard>
      )}
    />
  );
};
export default TopsList;
