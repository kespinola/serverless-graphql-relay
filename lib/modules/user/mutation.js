
import { GraphQLString, GraphQLNonNull } from 'graphql';
import UserType from './type';
import { userCreate, userLogin } from './resolve';

export const createUser = {
  type: UserType,
  description: 'Create user',
  args: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(source, args) {
    return userCreate(args);
  },
};

export const loginUser = {
  type: UserType,
  description: 'Login user',
  args: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(source, args) {
    return userLogin(args);
  },
};
