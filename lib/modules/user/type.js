import { GraphQLString, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './../node';

export default new GraphQLObjectType({
  name: 'User',
  description: 'app user',
  fields: () => ({
    id: globalIdField('User'),
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});
