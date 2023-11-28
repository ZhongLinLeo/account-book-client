import { ModalForm, ProFormMoney, ProFormSelect } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';
import { AccountOperate, FinancialAccount } from '../data';
import { SelectProps } from 'antd';

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
  accountOptions: SelectProps['options'];
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
        name="accountId"
        label="还款目的账户"
        disabled
        initialValue={props.value?.accountName}
      />
      <ProFormSelect
        showSearch
        name="sourceAccountId"
        label="来源账户"
        placeholder="来源账户"
        options={props.accountOptions}
        rules={[{ required: true, message: '请选择来源账户' }]}
      />
      <ProFormMoney name="balance" label="金额" placeholder="还款金额" />
    </ModalForm>
  );
};
export default RepaymentAccountForm;
