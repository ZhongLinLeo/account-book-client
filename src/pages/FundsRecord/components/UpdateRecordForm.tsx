import { ModalForm, ProFormDateTimePicker, ProFormMoney } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { SelectProps } from 'antd';
import React from 'react';
import type { FundsRecordResponse } from '../data';

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
  accountOptions: SelectProps['options'];
  classifyOptions: SelectProps['options'];
};

const UpdateRecordForm: React.FC<UpdateFormProps> = (props) => {
  console.log(props.value);
  return (
    <ModalForm
      title="创建分类"
      autoFocusFirstInput
      open={props.updateModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormMoney
        name="fundsRecordBalance"
        label="金额"
        placeholder="金额"
        initialValue={props.value.fundsRecordBalance}
      />
      <ProFormDateTimePicker
        name="fundsRecordTime"
        label="时间"
        placeholder="时间"
        initialValue={props.value.fundsRecordTime}
      />
      <ProFormText
        name="fundsRecordDescribe"
        label="记录描述"
        placeholder="描述"
        initialValue={props.value.fundsRecordDescribe}
      />
      <ProFormText
        name="fundsRecordRemark"
        label="记录备注"
        placeholder="备注"
        initialValue={props.value.fundsRecordRemark}
      />
      <ProFormSelect
        name="fundsRecordAccountId"
        label="账户信息"
        placeholder="账户"
        options={props.accountOptions}
        initialValue={props.value.accountInfo?.accountId}
      />
      <ProFormSelect
        name="fundsRecordClassifyId"
        label="分类信息"
        placeholder="分类"
        options={props.classifyOptions}
        initialValue={props.value.classifyInfo?.classifyId}
      />
      <ProFormSelect
        name="fundsUserId"
        label="记录人"
        placeholder="记录人"
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
