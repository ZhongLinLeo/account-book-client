import CreateClassifyForm from '@/pages/Classify/components/CreateClassifyForm';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  ProFormRadio,
  ProFormSwitch,
  ProList,
} from '@ant-design/pro-components';
import { Button, message, Tag, Progress } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateClassifyForm';
import UpdateClassifyForm from './components/UpdateClassifyForm';
import type { FinancialAccount } from './data.d';
import { addAccount, accounts, removeAccount, updateAccount } from './service';
import { useRequest } from 'umi';


/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: FinancialAccount) => {
  const hide = message.loading('正在添加');

  try {
    await addAccount({ ...fields });
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
const handleUpdate = async (fields: FormValueType, currentRow?: FinancialAccount) => {
  const hide = message.loading('正在配置');

  try {
    await updateAccount({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (record: FinancialAccount) => {
  const hide = message.loading('正在删除');
  if (!record) return true;

  console.log(record);
  try {
    await removeAccount({
      key: record.accountId,
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

const FinancialAccountCard: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FinancialAccount>();
  /** 国际化配置 */

  const { data, loading } = useRequest(() => {
    return accounts();
  });

  const list = data?.list || [];
  const nullData: Partial<FinancialAccount> = {};

  return (
    <PageContainer>
      <ProList<any>
        ghost={true}
        itemCardProps={{
          ghost: true,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions='hover'
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        headerTitle='卡片列表展示'
        dataSource={[nullData, ...list]}
      />
      <CreateClassifyForm
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
      />
      <UpdateClassifyForm
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
      />
    </PageContainer>
  );
};

export default FinancialAccountCard;
