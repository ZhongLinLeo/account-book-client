import CreateClassifyForm from '@/pages/Classify/components/CreateClassifyForm';
import { DeleteFilled, EditFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { Typography, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest } from 'umi';
import type { FormValueType } from './components/UpdateClassifyForm';
import UpdateClassifyForm from './components/UpdateClassifyForm';
import type { FinancialAccount } from './data.d';
import { accounts, addAccount, removeAccount, updateAccount } from './service';

const { Paragraph } = Typography;

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

  const [currentCard, setCurrentCard] = useState<FinancialAccount>();
  /** 国际化配置 */

  const { data, loading } = useRequest(() => {
    return accounts();
  });

  const [visible, setVisible] = useState(false);

  const list = data || [];

  const item = list.map((account) => ({
    title: account.accountName,
    description: account.accountDescribe,
    actions: [
      <EditFilled
        onClick={() => {
          setCurrentCard(account);
          handleUpdateModalVisible(true);
        }}
        style={{ color: '#4E89FF' }}
      />,
      <DeleteFilled
        onClick={async () => {
          await handleRemove(account);
          actionRef.current?.reloadAndRest?.();
        }}
        style={{ color: 'red' }}
      />,
      <EyeFilled
        hidden={visible}
        onClick={() => {
          setVisible(!visible);
        }}
      />,
      <EyeInvisibleFilled
        hidden={!visible}
        onClick={() => {
          setVisible(!visible);
        }}
      />,
    ],
    content: 'dkfasjf',
  }));

  return (
    <PageContainer>
      <ProList<FinancialAccount>
        ghost
        itemCardProps={{
          ghost: true,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        metas={{
          title: {},
          description: {},
          type: {},
          content: {},
          actions: {
            cardActionProps: 'actions',
          },
        }}
        dataSource={item}
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
          const success = await handleUpdate(value, currentCard);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentCard(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onOpenChange={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
        value={currentCard || {}}
      />
    </PageContainer>
  );
};

export default FinancialAccountCard;
