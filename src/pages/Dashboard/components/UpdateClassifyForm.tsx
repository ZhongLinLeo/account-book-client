import { ModalForm } from '@ant-design/pro-components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import type { ClassifyInfo } from '../data';

export type FormValueType = {
  classifyId: string;
  classifyName: string;
  classifyType: number;
  classifyDescribe: string;
} & Partial<ClassifyInfo>;

export type UpdateFormProps = {
  onOpenChange: (open: boolean) => void;
  onFinish: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  value: Partial<ClassifyInfo>;
};

const UpdateClassifyForm: React.FC<UpdateFormProps> = (props) => {
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
      <ProFormText
        name="classifyName"
        label="分类名称"
        placeholder="名称"
        initialValue={props.value.classifyName}
        // initialValue={props.value.classifyName}
      />
      <ProFormSelect
        name="classifyType"
        label="分类类型"
        placeholder="类型"
        initialValue={props.value.classifyType}
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
      <ProFormText
        name="classifyDescribe"
        label="分类描述"
        placeholder="描述"
        initialValue={props.value.classifyDescribe}
      />
    </ModalForm>
  );
};
export default UpdateClassifyForm;
