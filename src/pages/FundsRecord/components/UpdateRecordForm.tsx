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

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const UpdateRecordForm: React.FC<UpdateFormProps> = (props) => {
  console.log(props.value);
  return (
    <ModalForm
      {...layout}
      title='创建分类'
      autoFocusFirstInput
      open={props.updateModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'30%'}
      layout={'horizontal'}
    >
      <ProFormMoney
        name='fundsRecordBalance'
        label='金额'
        placeholder='金额'
        initialValue={props.value.fundsRecordBalance}
        rules={[{ required: true, message: '请输入金额' }]}
      />
      <ProFormDateTimePicker
        name='fundsRecordTime'
        label='时间'
        width={'md'}
        placeholder='时间'
        initialValue={props.value.fundsRecordTime}
        rules={[{ required: true, message: '请输入时间' }]}
      />
      <ProFormText
        name='fundsRecordDescribe'
        label='记录描述'
        placeholder='描述'
        initialValue={props.value.fundsRecordDescribe}
        rules={[{ required: true, message: '请输入描述' }]}
      />
      <ProFormText
        name='fundsRecordRemark'
        label='记录备注'
        placeholder='备注'
        initialValue={props.value.fundsRecordRemark}
      />
      <ProFormSelect
        showSearch
        name='fundsRecordAccountId'
        label='账户信息'
        placeholder='账户'
        options={props.accountOptions}
        initialValue={props.value.accountInfo?.accountId}
        rules={[{ required: true, message: '请选择账户' }]}
      />
      <ProFormSelect
        showSearch
        name='fundsRecordClassifyId'
        label='分类信息'
        placeholder='分类'
        options={props.classifyOptions}
        initialValue={props.value.classifyInfo?.classifyId}
        rules={[{ required: true, message: '请选择分类' }]}
      />
      <ProFormSelect
        name='fundsUserId'
        label='记录人'
        placeholder='记录人'
        initialValue={props.value.fundsUserId}
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
        rules={[{ required: true, message: '请选择记录人' }]}
      />
    </ModalForm>
  );
};
export default UpdateRecordForm;
