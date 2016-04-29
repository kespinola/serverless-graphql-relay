import { GraphQLSchema } from 'graphql';
import Queries from './query';
import Mutations from './mutation';

export default new GraphQLSchema({
  query: Queries,
  mutations: Mutations,
});
