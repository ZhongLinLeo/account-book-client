import { ModalForm, ProFormMoney } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import { Cascader, SelectProps } from 'antd';
import React from 'react';
import { AccountOperate, FinancialAccount } from '../data';

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
  accountList: FinancialAccount[];
};

interface Option {
  value: string;
  label: string;
  children?: SelectProps['options'];
}

const targetOptions = (record: FinancialAccount, accounts: FinancialAccount[]) => {
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
    if (account.accountType == 0 && account.accountId != record?.accountId) {
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

const TransferAccountForm: React.FC<TransferFormProps> = (props) => {
  // let targetOptions = targetOptions(props.value, props.accountList);

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
        options={targetOptions(props.value, props.accountList)}
        rules={[{ required: true, message: '请选择目的账户' }]}
      />
      <ProFormMoney name="balance" label="金额" placeholder="转账金额" />
    </ModalForm>
  );
};
export default TransferAccountForm;
