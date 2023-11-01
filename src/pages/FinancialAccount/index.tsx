import CreateClassifyForm from '@/pages/Classify/components/CreateClassifyForm';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  ProFormRadio,
  ProFormSwitch,
  ProList,
} from '@ant-design/pro-components';
import { Button, message, Tag, Progress } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateClassifyForm';
import UpdateClassifyForm from './components/UpdateClassifyForm';
import type { TableListItem, TableListPagination } from './data.d';
import { addClassify, classifies, removeClassify, updateClassify } from './service';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
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

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateClassify({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (record: TableListItem) => {
  const hide = message.loading('正在删除');
  if (!record) return true;

  console.log(record);
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

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color='#5BD8A6'>语雀专栏</Tag>,
  actions: [<a key='run'>邀请</a>, <a key='delete'>删除</a>],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

const FinancialAccountCard: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'classifyName',
      width: '20%',
    },
    {
      title: '类型',
      dataIndex: 'classifyType',
      hideInForm: true,
      width: '20%',
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
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
          shape={'circle'}
          style={{ border: 'none' }}
          icon={<EditFilled style={{ color: '#4E89FF' }} />}
        />,
        <Button
          onClick={async () => {
            await handleRemove(record);
            actionRef.current?.reloadAndRest?.();
          }}
          style={{ border: 'none' }}
          icon={<DeleteFilled style={{ color: 'red' }} />}
          shape={'circle'}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProList<any>
        ghost={true}
        itemCardProps={{
          ghost: true,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions='hover'
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        headerTitle='卡片列表展示'
        dataSource={data}
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

export default FinancialAccountCard;
