import { graphql } from 'graphql';
import Schema from './../modules/schema';

export default query => graphql(Schema, query);
