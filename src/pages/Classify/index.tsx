import CreateClassifyForm from '@/pages/Classify/components/CreateClassifyForm';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateClassifyForm';
import UpdateClassifyForm from './components/UpdateClassifyForm';
import type { ClassifyInfo, TableListPagination } from './data.d';
import { addClassify, classifies, removeClassify, updateClassify } from './service';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: ClassifyInfo) => {
  const hide = message.loading('正在添加');

  try {
    await addClassify({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: ClassifyInfo) => {
  const hide = message.loading('正在修改');

  try {
    await updateClassify({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (record: ClassifyInfo) => {
  const hide = message.loading('正在删除');
  if (!record) return true;
  try {
    await removeClassify({
      key: record.classifyId,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ClassifyInfo>();
  /** 国际化配置 */

  const columns: ProColumns<ClassifyInfo>[] = [
    {
      title: '名称',
      dataIndex: 'classifyName',
      width: '20%',
    },
    {
      title: '类型',
      dataIndex: 'classifyType',
      hideInForm: true,
      width: '10%',
      search: false,
      valueEnum: {
        0: {
          text: '支出',
          status: 'Error',
        },
        1: {
          text: '收入',
          status: 'Success',
        },
      },
    },
    {
      title: '计入收支分析',
      sorter: false,
      search: false,
      dataIndex: 'includeAnalyze',
      width: '10%',
      valueEnum: {
        0: {
          text: '不计入',
          status: 'Error',
        },
        1: {
          text: '计入',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'classifyDescribe',
      search: false,
      width: '20%',
    },
    {
      title: '创建时间',
      sorter: true,
      search: false,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: '30%',
    },
    {
      title: '操作',
      search: false,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          disabled={record.defaultClassify === 1}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
          shape={'circle'}
          style={{ border: 'none' }}
          icon={<EditFilled style={{ color: record.defaultClassify === 1 ? 'grey' : '#4E89FF' }} />}
        />,
        <Button
          onClick={async () => {
            await handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
          disabled={record.defaultClassify === 1}
          style={{ border: 'none' }}
          icon={<DeleteFilled style={{ color: record.defaultClassify === 1 ? 'grey' : 'red' }} />}
          shape={'circle'}
        />,
      ],
    },
  ];

  return (
    <PageContainer
      title={'分类信息'}
      extra={
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            handleCreateModalVisible(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      }
    >
      <ProTable<ClassifyInfo, TableListPagination>
        // headerTitle='查询表格'
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        request={classifies}
        columns={columns}
        options={{ density: false, setting: false, reload: false }}
      />
      <CreateClassifyForm
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onOpenChange={handleCreateModalVisible}
        createModalVisible={createModalVisible}
      />
      <UpdateClassifyForm
        onFinish={async (value) => {
          const success = await handleUpdate(value, currentRow);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onOpenChange={handleUpdateModalVisible}
        updateModalVisible={updateModalVisible}
        value={currentRow || {}}
      />
    </PageContainer>
  );
};

export default TableList;
