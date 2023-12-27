import { ModalForm, ProFormMoney, ProFormSelect } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import { SelectProps } from 'antd';
import React from 'react';
import { FinancialAccount } from '../data';

export type FormValueType = {
  accountId: string;
  accountName: string;
  accountDescribe: string;
  accountBalance: number;
  accountIncome: number;
  accountExpenditure: number;
} & Partial<FinancialAccount>;

export type UpdateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  userOptions: SelectProps['options'];
  value: Partial<FinancialAccount>;
};

const UpdateAccountForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      title="编辑账户"
      autoFocusFirstInput
      open={props.updateModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText
        name="accountName"
        label="账户名称"
        placeholder="名称"
        initialValue={props.value.accountName}
      />
      <ProFormText
        name="accountDescribe"
        label="账户描述"
        placeholder="描述"
        initialValue={props.value.accountDescribe}
      />
      <ProFormMoney
        name="accountBalance"
        label="账户余额"
        placeholder="余额"
        initialValue={props.value.accountBalance}
      />
      <ProFormMoney
        name="accountIncome"
        label="账户收入"
        placeholder="收入"
        initialValue={props.value.accountIncome}
      />
      <ProFormMoney
        name="accountExpenditure"
        label="账户支出"
        placeholder="支出"
        initialValue={props.value.accountExpenditure}
      />
      <ProFormSelect
        name="accountOwnershipId"
        label="账户归属"
        placeholder="所属"
        initialValue={props.value.accountOwnershipId}
        options={props.userOptions}
      />
    </ModalForm>
  );
};
export default UpdateAccountForm;
