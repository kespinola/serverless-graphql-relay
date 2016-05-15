
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserType from './type';
import TokenType from './../token/type';
import { loginCreate, loginUser } from './resolve';


export const createLogin = mutationWithClientMutationId({
  name: 'CreateLogin',
  inputFields: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: {
      type: TokenType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: ({ email, password }) => loginCreate(email, password),
});

export const login = mutationWithClientMutationId({
  name: 'LoginUser',
  inputFields: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: {
      type: TokenType,
      resolve: ({ token }) => token,
    },
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: ({ email, password }) => loginUser(email, password),
});
