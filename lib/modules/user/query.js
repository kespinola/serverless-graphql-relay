import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import UserType from './type';
import { getUser, getUsers } from './resolve';

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
  type: new GraphQLList(UserType),
  description: 'Get all users',
  resolve() {
    return getUsers();
  },
};
