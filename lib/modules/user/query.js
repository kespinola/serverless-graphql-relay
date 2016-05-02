import { GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import UserType from './type';
import { getUser, getUsers } from './resolve';

const i18 = {
  USER_DESCRIPTION: 'get user by id',
  USERS_DESCRIPTION: 'get all users',
};

export const user = {
  type: UserType,
  description: i18.USER_DESCRIPTION,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve(source, { id }) {
    return getUser(id);
  },
};

export const users = {
  type: new GraphQLList(UserType),
  description: i18.USERS_DESCRIPTION,
  resolve() {
    return getUsers();
  },
};
