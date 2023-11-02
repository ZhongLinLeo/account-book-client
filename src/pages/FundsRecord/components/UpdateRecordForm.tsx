import { ModalForm, ProFormDateTimePicker } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import type { FundsRecordResponse } from '../data';
import { FinancialAccount } from '@/pages/FinancialAccount/data';
import { ClassifyInfo } from '@/pages/Classify/data';

export type FormValueType = {
  classifyId: string;
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
} & Partial<FundsRecordResponse>;

export type UpdateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  value: Partial<FundsRecordResponse>;
  accountList: FinancialAccount[]
  classifyList: ClassifyInfo[]
};

const UpdateRecordForm: React.FC<UpdateFormProps> = (props) => {
  console.log(props.value);
  return (
    <ModalForm
      title='创建分类'
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
        name='fundsRecordBalance'
        label='金额'
        placeholder='金额'
        initialValue={props.value.fundsRecordBalance} />
      <ProFormDateTimePicker
        name='fundsRecordTime'
        label='时间'
        placeholder='时间'
        initialValue={props.value.fundsRecordTime}
      />
      <ProFormText
        name='fundsRecordDescribe'
        label='记录描述'
        placeholder='描述'
        initialValue={props.value.fundsRecordDescribe} />
      <ProFormText
        name='fundsRecordRemark'
        label='记录备注'
        placeholder='备注'
        initialValue={props.value.fundsRecordRemark} />
      <ProFormSelect
        name='fundsUserId'
        label='记录人'
        placeholder='记录人'
        initialValue={props.value.fundsUserId}
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
export default UpdateRecordForm;
