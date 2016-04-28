import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import Schema from './../modules/schema';

export default graphql(Schema, introspectionQuery);
