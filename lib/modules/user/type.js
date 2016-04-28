import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  description: 'app user',
  fields: () => ({
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    token: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
