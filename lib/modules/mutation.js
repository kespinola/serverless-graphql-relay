import { GraphQLObjectType } from 'graphql';
import { loginUser, createLogin } from './user/mutation';

export default new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    loginUser,
    createLogin,
  },
});
