
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserType from './type';
import TokenType from './../token/type';
import { loginCreate, userLogin } from './resolve';


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
