import { ModalForm, ProFormMoney, ProFormSelect } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';
import { AccountOperate, FinancialAccount } from '../data';
import { SelectProps, Cascader } from 'antd';

export type FormValueType = {
  accountId: number;
  targetAccountId: number;
  balance: number;
} & Partial<AccountOperate>;

export type TransferFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  transferModalVisible: boolean;
  value: Partial<FinancialAccount>;
  accountOptions: SelectProps['options'];
};

interface Option {
  value: string;
  label: string;
  children?: SelectProps['options'];
}

const targetOptions = (accounts: FinancialAccount[]) => {
  const groupBy = (array: FinancialAccount[], func: Function) => {
    const options: Option[] = [];

    array.forEach((item) => {
      item.accountOwner;
      const group = JSON.stringify(func(item));
      groups[group] = groups[group] || [];
      groups[group].push(item);
    });

    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  };

  const optionData = groupBy(accounts, (account: FinancialAccount) => {
    return account.accountOwner;
  });

  return optionData;
};

const TransferAccountForm: React.FC<TransferFormProps> = (props) => {
  return (
    <ModalForm
      title="转账操作"
      autoFocusFirstInput
      open={props.transferModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText
        name="accountId"
        label="来源账户"
        placeholder="名称"
        disabled
        initialValue={props.value?.accountName}
      />
      <Cascader
        showSearch
        name="targetAccountId"
        label="目的账户"
        placeholder="目的账户"
        options={props.accountOptions}
        rules={[{ required: true, message: '请选择目的账户' }]}
      />
      <ProFormMoney name="balance" label="金额" placeholder="转账金额" />
    </ModalForm>
  );
};
export default TransferAccountForm;
