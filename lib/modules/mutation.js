import { GraphQLObjectType } from 'graphql';
import { login, createLogin } from './user/mutation';

export default new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    login,
    createLogin,
  },
});
