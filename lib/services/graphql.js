import { graphql } from 'graphql';
import Schema from './../modules/schema';

export default (query, variables) =>
  graphql(Schema, query, null, variables);
