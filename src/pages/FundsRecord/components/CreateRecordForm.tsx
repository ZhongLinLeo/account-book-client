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
  accountOptions: any;
  userOptions: any;
  classifyOptions: SelectProps['options'];
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CreateRecordForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      {...layout}
      title="记录流水"
      autoFocusFirstInput
      open={props.createModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'30%'}
      layout={'horizontal'}
      initialValues={{
        fundsUserId: props.userOptions[0]?.value,
        fundsRecordTime: Date.now(),
      }}
    >
      <ProFormMoney
        width="md"
        name="fundsRecordBalance"
        label="金额"
        placeholder="金额"
        rules={[{ required: true, message: '请输入金额' }]}
      />
      <ProFormDateTimePicker
        width={'md'}
        name="fundsRecordTime"
        label="时间"
        placeholder="时间"
        rules={[{ required: true, message: '请输入时间' }]}
      />
      <ProFormText
        name="fundsRecordDescribe"
        label="记录描述"
        placeholder="描述"
        rules={[{ required: true, message: '请输入描述' }]}
      />
      <ProFormText name="fundsRecordRemark" label="记录备注" placeholder="备注" />
      <ProFormSelect
        showSearch
        name="fundsRecordAccountId"
        label="账户信息"
        placeholder="账户"
        options={props.accountOptions}
        rules={[{ required: true, message: '请选择账户' }]}
      />
      <ProFormSelect
        showSearch
        name="fundsRecordClassifyId"
        label="分类信息"
        placeholder="分类"
        options={props.classifyOptions}
        rules={[{ required: true, message: '请选择分类' }]}
      />
      <ProFormSelect
        name="fundsUserId"
        label="记录人"
        placeholder="记录人"
        options={props.userOptions}
        rules={[{ required: true, message: '请选择记录人' }]}
      />
    </ModalForm>
  );
};

export default CreateRecordForm;
