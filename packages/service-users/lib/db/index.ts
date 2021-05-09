import DynamoDB, { DocumentClient, ClientConfiguration } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';

import { UserItem } from './schema';

const getTableName = () => 'users';
const getUserItemKey = (id: string): UserItem => ({
  hk: id,
  sk: id,
});

const getDocumentClient = () => {
  const config: ClientConfiguration = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  };
  if (process.env.NODE_ENV === 'test') {
    config.endpoint = 'http://localhost:8000';
    config.sslEnabled = false;
  }
  return new DocumentClient(config);
}

export const createUser = async (): Promise<UserItem> => {
  const client = getDocumentClient()
  const userId = uuid();
  const result = await client.put({
    TableName: getTableName(),
    Item: getUserItemKey(userId),
  }).promise();
  const item = result.Attributes;
  return item as UserItem;
};

export const getUser = async (userId: string): Promise<UserItem | undefined> => {
  const client = getDocumentClient();
  const result = await client.get({
    TableName: getTableName(),
    Key: getUserItemKey(userId),
  }).promise();
  const item = result.Item as UserItem ?? undefined;
  return item;
}