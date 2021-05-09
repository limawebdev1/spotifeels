import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';

import { UserItem } from './schema';

const getTableName = () => 'users';
const getUserItemKey = (id: string): UserItem => ({
  hk: id,
  sk: id,
});

export const createUser = async (): Promise<UserItem> => {
  const client = new DocumentClient();
  const userId = uuid();
  const result = await client.put({
    TableName: getTableName(),
    Item: getUserItemKey(userId),
  }).promise();
  const item = result.Attributes;
  return item as UserItem;
};

export const getUser = async (userId: string): Promise<UserItem | undefined> => {
  const client = new DocumentClient();
  const result = await client.get({
    TableName: getTableName(),
    Key: getUserItemKey(userId),
  }).promise();
  const item = result.Item as UserItem ?? undefined;
  return item;
}