import CreateClassifyForm from '@/pages/Classify/components/CreateClassifyForm';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Badge, Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateRecordForm';
import UpdateRecordForm from './components/UpdateRecordForm';
import type { FundsRecordItem, FundsRecordPagination } from './data.d';
import { addClassify, classifies, removeClassify, updateClassify } from './service';
import { accounts } from '@/pages/FinancialAccount/service';
import { useRequest } from 'umi';
import CreateRecordForm from '@/pages/FundsRecord/components/CreateRecordForm';
import { listClassify } from '@/pages/Classify/service';
import { ProCard, ProFormMoney } from '@ant-design/pro-components';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: FundsRecordItem) => {
  const hide = message.loading('正在添加');

  try {
    await addClassify({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: FundsRecordItem) => {
  const hide = message.loading('正在编辑');

  try {
    await updateClassify({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败，请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (record: FundsRecordItem) => {
  const hide = message.loading('正在删除');
  if (!record) return true;
  try {
    await removeClassify({
      key: record.fundsRecordId,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FundsRecordItem>();
  /** 国际化配置 */

  const { accountList } = useRequest(accounts);
  const { classifyList } = useRequest(listClassify);

  const columns: ProColumns<FundsRecordItem>[] = [
    {
      title: '金额',
      hideInForm: true,
      dataIndex: 'fundsRecordBalance',
      width: '10%',
      render: (_, item) => {
        return (
          <ProCard layout='left' style={{ color: item.classifyInfo.classifyType === 1 ? 'red' : 'green' }}>
            {item.classifyInfo.classifyType === 1 ? '-' : '+'}{item.fundsRecordBalance}
          </ProCard>
        );
      },
    },
    {
      title: '时间',
      dataIndex: 'fundsRecordTime',
      width: '25%',
      search: false,
    },
    {
      title: '描述',
      dataIndex: 'fundsRecordDescribe',
      search: false,
      width: '20%',
    },
    {
      title: '账户信息',
      sorter: true,
      search: false,
      dataIndex: 'fundsAccountInfo',
      width: '20%',
    },
    {
      title: '记录人',
      search: false,
      dataIndex: 'fundsAccountInfo',
      width: '15%',
    },
    {
      title: '操作',
      search: false,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
          shape={'circle'}
          style={{ border: 'none' }}
          icon={<EditFilled style={{ color: '#4E89FF' }} />}
        />,
        <Button
          onClick={async () => {
            await handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
          style={{ border: 'none' }}
          icon={<DeleteFilled style={{ color: 'red' }} />}
          shape={'circle'}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<FundsRecordItem, FundsRecordPagination>
        // headerTitle='查询表格'
        actionRef={actionRef}
        rowKey='key'
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={classifies}
        columns={columns}
        options={{ density: false, setting: false, reload: false }}
      />
      <CreateRecordForm
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onOpenChange={handleCreateModalVisible}
        createModalVisible={createModalVisible}
        accountList={accountList}
        classifyList={classifyList}
      />
      <UpdateRecordForm
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentRow);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onOpenChange={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
        value={currentRow || {}}
        accountList={accountList}
        classifyList={classifyList}
      />
    </PageContainer>
  );
};

export default TableList;
