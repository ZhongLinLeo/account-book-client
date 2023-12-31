// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AccountOperate, FinancialAccount, Option } from './data';

/** 获取账户列表 GET /account/list */
export async function accounts(): Promise<{ data: { list: FinancialAccount[] } }> {
  return request('/api/account/list');
}

/** 更新账户 PUT /api/account */
export async function updateAccount(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<FinancialAccount>('/api/account/' + data.accountId, {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 转账 PUT /api/account */
export async function transfer(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<AccountOperate>('/api/account/' + data.accountId + '/transfer', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 还款 PUT /api/account */
export async function repayment(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<AccountOperate>('/api/account/' + data.accountId + '/repayment', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建账户 POST /api/account */
export async function addAccount(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<FinancialAccount>('/api/account', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除账户 DELETE /api/account */
export async function removeAccount(data: { key: number }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/account/' + data.key, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export const allAccountOptions = (accountList: FinancialAccount[]) => {
  const constructOption = (account: FinancialAccount) => ({
    value: account.accountOwner,
    label: account.accountOwner,
    children: [],
  });

  const constructChildren = (account: FinancialAccount) => ({
    value: account.accountId,
    label: account.accountName,
  });

  const options: Option[] = [];
  accountList.forEach((account) => {
    let accountOwner = account.accountOwner;
    let exist = options.some((option) => option.value == accountOwner);
    if (exist) {
      options.forEach((option) => {
        if (option.value === accountOwner) {
          option.children?.push(constructChildren(account));
        }
      });
    } else {
      let option = constructOption(account);
      option.children?.push(constructChildren(account));
      options.push(option);
    }
  });
  return options;
};
