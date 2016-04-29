import { GraphQLObjectType } from 'graphql';
import { loginUser, createUser } from './user/mutation';

export default new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    loginUser,
    createUser,
  },
});
