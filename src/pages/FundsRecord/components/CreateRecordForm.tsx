import { ModalForm, ProFormDateTimePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import type { FundsRecordItem } from '../data';
import { FinancialAccount } from '@/pages/FinancialAccount/data';

export type FormValueType = {
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
} & Partial<FundsRecordItem>;

export type CreateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
  accountList: FinancialAccount[]
};

const CreateRecordForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      title='记录流水'
      autoFocusFirstInput
      open={props.createModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText name='fundsRecordBalance' label='金额' placeholder='金额' />
      <ProFormDateTimePicker
        name='fundsRecordTime'
        label='时间'
        placeholder='时间'
      />
      <ProFormText name='fundsRecordDescribe' label='记录描述' placeholder='描述' />
      <ProFormText name='fundsRecordRemark' label='记录备注' placeholder='备注' />
      <ProFormSelect
        name='fundsUserId'
        label='记录人'
        placeholder='记录人'
        options={[
          {
            value: 10001,
            label: '钟林',
          },
          {
            value: 10002,
            label: '于奇',
          },
        ]}
      />
    </ModalForm>
  );
};

export default CreateRecordForm;
