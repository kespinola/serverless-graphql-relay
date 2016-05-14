import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'JSONWebToken',
  description: 'jsonwebtoken',
  fields: () => ({
    value: { type: GraphQLString },
  }),
});
