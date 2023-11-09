import CreateAccountForm from '@/pages/FinancialAccount/components/CreateAccountForm';
import UpdateAccountForm from '@/pages/FinancialAccount/components/UpdateAccountForm';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  EyeInvisibleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import { ProCard, ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest } from 'umi';
import type { FormValueType } from './components/UpdateAccountForm';
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
 * @param currentCard
 */
const handleUpdate = async (fields: FormValueType, currentCard?: FinancialAccount) => {
  const hide = message.loading('正在更新');

  try {
    await updateAccount({
      ...currentCard,
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
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
  try {
    await removeAccount({
      key: record.accountId,
    });
    hide();
    message.success('删除成功');
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

  const { run, data, loading } = useRequest(accounts);

  const [visible, setVisible] = useState(true);

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
    content: (
      <ProCard ghost gutter={8}>
        <ProCard layout="left">
          收入:&nbsp;&nbsp;&nbsp;{visible ? '********' : account.accountIncome}
        </ProCard>
        <ProCard layout="left">
          支出:&nbsp;&nbsp;&nbsp;{visible ? '********' : account.accountExpenditure}
        </ProCard>
        <ProCard layout="left">
          余额:&nbsp;&nbsp;&nbsp;{visible ? '********' : account.accountBalance}
        </ProCard>
      </ProCard>
    ),
  }));

  return (
    <PageContainer
      title={'账户信息'}
      extra={
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            handleCreateModalVisible(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProList<FinancialAccount>
        ghost
        itemCardProps={{
          ghost: true,
        }}
        showActions="hover"
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

      <CreateAccountForm
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalVisible(false);
            run();
          }
        }}
        onOpenChange={handleCreateModalVisible}
        createModalVisible={createModalVisible}
      />
      <UpdateAccountForm
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentCard);
          if (success) {
            handleUpdateModalVisible(false);
            run();
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
