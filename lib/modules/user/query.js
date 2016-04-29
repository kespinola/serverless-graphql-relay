import { GraphQLString, GraphQLNonNull } from 'graphql';
import UserType from './type';
import { getUser } from './resolve';

export const user = {
  type: UserType,
  description: 'Get user by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(source, { id }) {
    return getUser(id);
  },
};

export const users = {
  type: UserType,
  description: 'Get all users',
  resolve() {
    return [];
  },
};
