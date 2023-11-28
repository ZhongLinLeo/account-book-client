import { ModalForm, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import type { FinancialAccount } from '../data';

export type FormValueType = {
  accountName: string;
  accountDescribe: string;
  accountBalance: number;
  accountIncome: number;
  accountOwnershipId: string;
  accountOwner: string;
  accountExpenditure: number;
} & Partial<FinancialAccount>;

export type CreateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
};

const CreateAccountForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      title="创建账户"
      autoFocusFirstInput
      open={props.createModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText name="accountName" label="账户名称" placeholder="名称" />
      <ProFormText name="accountDescribe" label="账户描述" placeholder="描述" />
      <ProFormMoney name="accountBalance" label="账户余额" placeholder="余额" />
      <ProFormSelect
        name="accountOwnershipId"
        label="账户归属"
        placeholder="所属"
        options={[
          {
            value: '10001',
            label: '钟林',
          },
          {
            value: '10002',
            label: '于奇',
          },
        ]}
      />
    </ModalForm>
  );
};

export default CreateAccountForm;
