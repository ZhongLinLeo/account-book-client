import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { SelectProps } from 'antd';
import React from 'react';
import { FundsRecord } from '../data';

export type FormValueType = {
  fundsRecordBalance: number;
  fundsRecordTime: Date;
  fundsRecordDescribe: string;
  fundsRecordRemark: string;
  fundsRecordClassifyId: string;
  fundsAccountId: string;
  fundsUserId: string;
} & Partial<FundsRecord>;

export type CreateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
  accountOptions: SelectProps['options'];
  classifyOptions: SelectProps['options'];
};

const CreateRecordForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      title="记录流水"
      autoFocusFirstInput
      open={props.createModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormMoney name="fundsRecordBalance" label="金额" placeholder="金额" />
      <ProFormDateTimePicker name="fundsRecordTime" label="时间" placeholder="时间" />
      <ProFormText name="fundsRecordDescribe" label="记录描述" placeholder="描述" />
      <ProFormText name="fundsRecordRemark" label="记录备注" placeholder="备注" />
      <ProFormSelect
        name="fundsRecordAccountId"
        label="账户信息"
        placeholder="账户"
        options={props.accountOptions}
      />
      <ProFormSelect
        name="fundsRecordClassifyId"
        label="分类信息"
        placeholder="分类"
        options={props.classifyOptions}
      />
      <ProFormSelect
        name="fundsUserId"
        label="记录人"
        placeholder="记录人"
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
