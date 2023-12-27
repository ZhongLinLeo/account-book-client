// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { User, UserOptions } from './data';

/** 获取用户列表 GET /user/list */
export async function listUser(): Promise<{ data: { list: User[] } }> {
  return request('/api/user/list');
}

export const constructUserOptions = (userList: User[]) => {
  const constructOption = (user: User) => ({
    value: user.userId,
    label: user.userName,
  });

  const options: UserOptions[] = [];
  userList.forEach((user) => {
    let option = constructOption(user);
    options.push(option);
  });
  return options;
};
