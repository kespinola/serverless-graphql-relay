import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  description: 'app user',
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
