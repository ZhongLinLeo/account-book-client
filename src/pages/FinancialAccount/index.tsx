import CreateAccountForm from '@/pages/FinancialAccount/components/CreateAccountForm';
import RepaymentAccountForm from '@/pages/FinancialAccount/components/RepaymentAccountForm';
import TransferAccountForm from '@/pages/FinancialAccount/components/TransferAccountForm';
import UpdateAccountForm from '@/pages/FinancialAccount/components/UpdateAccountForm';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  EyeInvisibleFilled,
  FrownOutlined,
  PlusOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { ProDescriptions, ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { Avatar, Button, Tag, Typography, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest } from 'umi';
import type { FormValueType } from './components/UpdateAccountForm';
import type { FinancialAccount } from './data.d';
import { accounts, addAccount, removeAccount, repayment, transfer, updateAccount } from './service';

const { Text } = Typography;

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
 * 转账
 *
 * @param fields
 */
const handleTransfer = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');

  try {
    await transfer({
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
 * 还款
 *
 * @param fields
 */
const handleRepayment = async (fields: FormValueType) => {
  const hide = message.loading('还款操作');

  try {
    await repayment({
      ...fields,
    });
    hide();
    message.success('还款操作成功');
    return true;
  } catch (error) {
    hide();
    message.error('还款操作失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param record
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

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [transferModalVisible, handleTransferModalVisible] = useState<boolean>(false);
  const [repaymentModalVisible, handleRepaymentModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentCard, setCurrentCard] = useState<FinancialAccount>();
  const { run, data } = useRequest(accounts);
  const [visible, setVisible] = useState(false);

  const list = data || [];
  const item = list.map((account) => ({
    avatar: <Avatar style={{ backgroundColor: '#108ee9' }}>{account.accountOwner}</Avatar>,
    title: (
      <div>
        &nbsp;{account.accountName}&nbsp;&nbsp;
        <Tag color={account.accountType === 0 ? 'blue' : 'green'}>
          {account.accountType === 0 ? '储蓄卡' : '信用卡'}
        </Tag>
      </div>
    ),
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
      <TransactionOutlined
        hidden={account.accountType == 1}
        style={{ color: 'green' }}
        onClick={() => {
          setCurrentCard(account);
          handleTransferModalVisible(true);
        }}
      />,
      <FrownOutlined
        hidden={account.accountType == 0}
        onClick={() => {
          setCurrentCard(account);
          handleRepaymentModalVisible(true);
        }}
      />,
    ],
    content: (
      <div style={{ height: 150 }}>
        <Text>{account.accountDescribe}</Text>
        <ProDescriptions style={{ position: 'relative', top: 80 }}>
          <ProDescriptions.Item style={{ position: 'bottom' }}>
            收入:&nbsp;&nbsp;{visible ? account.accountIncome : '********'}
          </ProDescriptions.Item>
          <ProDescriptions.Item>
            支出:&nbsp;&nbsp;{visible ? account.accountExpenditure : '********'}
          </ProDescriptions.Item>
          <ProDescriptions.Item>
            余额:&nbsp;&nbsp;{visible ? account.accountBalance : '********'}
          </ProDescriptions.Item>
        </ProDescriptions>
      </div>
    ),
  }));

  return (
    <PageContainer
      title={'账户信息'}
      extra={[
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            handleCreateModalVisible(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>,
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <EyeFilled hidden={!visible} />
          <EyeInvisibleFilled hidden={visible} />
        </Button>,
      ]}
    >
      <ProList<FinancialAccount>
        ghost
        itemCardProps={{
          ghost: true,
        }}
        showActions="hover"
        grid={{ gutter: 16, column: 3 }}
        metas={{
          avatar: {},
          title: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
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
      <TransferAccountForm
        onOpenChange={handleTransferModalVisible}
        onFinish={async (value) => {
          const success = await handleTransfer(value, currentCard);
          if (success) {
            handleTransferModalVisible(false);
            run();
          }
        }}
        transferModalVisible={transferModalVisible}
        value={currentCard}
        accountList={list}
      />
      <RepaymentAccountForm
        onOpenChange={handleRepaymentModalVisible}
        onFinish={async (value) => {
          const success = await handleRepayment(value, currentCard);
          if (success) {
            handleRepaymentModalVisible(false);
            run();
          }
        }}
        repaymentModalVisible={repaymentModalVisible}
        value={currentCard}
        accountList={list}
      />
    </PageContainer>
  );
};

export default FinancialAccountCard;
