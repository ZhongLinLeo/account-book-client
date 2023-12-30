import { Compose, Top } from '@/pages/Dashboard/data';
import { FundsRecordResponse } from '@/pages/FundsRecord/data';
import { paginationRecords } from '@/pages/FundsRecord/service';
import { ProColumns } from '@ant-design/pro-table';
import { Drawer } from 'antd';
import React from 'react';
import { useRequest } from 'umi';

export type ComposeByClassifyProps = {
  composeByClassify: Partial<FundsRecordResponse[]>;
  composeInfo: Compose;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const ComposeByClassify: React.FC<ComposeByClassifyProps> = (props) => {
  const columns: ProColumns<Top>[] = [
    {
      title: '金额',
      dataIndex: 'fundsRecordBalance',
      key: 'fundsRecordBalance',
      width: '30%',
      render: (_, item, index) => {
        return (
          <>
            {/*<Avatar style={{ backgroundColor: '#108ee9' }}>{index + 1}</Avatar>*/}
            <Text strong>{item.fundsRecordBalance}</Text>
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

  const { data: fundsRecord, run } = useRequest(paginationRecords, { manual: true });

  return (
    <Drawer
      title={props.composeInfo?.classifyName}
      placement="right"
      width={640}
      onClose={() => props.onOpenChange(false)}
      open={props.open}
    >
      {props.composeByClassify[0]?.fundsRecordBalance}
    </Drawer>
  );
};
export default ComposeByClassify;
