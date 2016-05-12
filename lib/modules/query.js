import { GraphQLObjectType } from 'graphql';
import { user, users } from './user/query';
import { nodeField as node } from './node';

export default new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'root queries for app',
  fields: {
    user,
    users,
    node,
  },
});
