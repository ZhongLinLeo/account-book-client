import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormMoney,
  ProFormSelect,
} from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import { SelectProps } from 'antd';
import React from 'react';
import { AccountOperate, FinancialAccount } from '../data';

export type FormValueType = {
  accountId: number;
  sourceAccountId: number;
  balance: number;
} & Partial<AccountOperate>;

export type TransferFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  repaymentModalVisible: boolean;
  value: Partial<FinancialAccount>;
  accountList: FinancialAccount[];
};

interface Option {
  value: string;
  label: string;
  children?: SelectProps['options'];
}

const targetOptions = (accounts: FinancialAccount[]) => {
  const constructOption = (account: FinancialAccount) => ({
    value: account.accountOwner,
    label: account.accountOwner,
    children: [],
  });

  const constructChildren = (account: FinancialAccount) => ({
    value: account.accountId,
    label: account.accountName,
  });

  const options: Option[] = [];
  accounts.forEach((account) => {
    if (account.accountType == 0) {
      let accountOwner = account.accountOwner;
      let exist = options.some((option) => option.value == accountOwner);
      if (exist) {
        options.forEach((option) => {
          if (option.value === accountOwner) {
            option.children?.push(constructChildren(account));
          }
        });
      } else {
        let option = constructOption(account);
        option.children?.push(constructChildren(account));
        options.push(option);
      }
    }
  });
  return options;
};

const RepaymentAccountForm: React.FC<TransferFormProps> = (props) => {
  return (
    <ModalForm
      title="还款操作"
      autoFocusFirstInput
      open={props.repaymentModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText
        name="accountName"
        label="还款目的账户"
        disabled
        initialValue={props.value?.accountName}
      />
      <ProFormSelect
        showSearch
        name="sourceAccountId"
        label="来源账户"
        placeholder="来源账户"
        options={targetOptions(props.accountList)}
        rules={[{ required: true, message: '请选择来源账户' }]}
      />
      <ProFormDateTimePicker
        width={'md'}
        name="operateTime"
        label="还款时间"
        placeholder="还款时间"
        initialValue={Date.now()}
        rules={[{ required: true, message: '请输入还款时间' }]}
      />
      <ProFormMoney name="balance" label="金额" placeholder="还款金额" />
    </ModalForm>
  );
};
export default RepaymentAccountForm;
