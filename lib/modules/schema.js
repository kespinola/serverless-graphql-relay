import { GraphQLSchema } from 'graphql';
import Queries from './query';

export default new GraphQLSchema({
  query: Queries,
});
