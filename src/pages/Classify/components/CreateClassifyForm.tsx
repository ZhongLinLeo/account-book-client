import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import type { ClassifyInfo } from '../data';

export type FormValueType = {
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
} & Partial<ClassifyInfo>;

export type CreateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  createModalVisible: boolean;
};

const CreateClassifyForm: React.FC<CreateFormProps> = (props) => {
  return (
    <ModalForm
      title="创建分类"
      autoFocusFirstInput
      open={props.createModalVisible}
      onOpenChange={props.onOpenChange}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={props.onFinish}
      width={'20%'}
    >
      <ProFormText name="classifyName" label="分类名称" placeholder="名称" />
      <ProFormSelect
        name="classifyType"
        label="分类类型"
        placeholder="类型"
        options={[
          {
            value: 0,
            label: '支出',
          },
          {
            value: 1,
            label: '收入',
          },
        ]}
      />
      <ProFormText name="classifyDescribe" label="分类描述" placeholder="描述" />
    </ModalForm>
  );
};

export default CreateClassifyForm;
