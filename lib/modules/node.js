import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { getUser } from './user/resolve';
import userType from './user/type';

const lookup = {
  User: getUser,
};

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return lookup[type](id);
  },
  (obj) => {
    return userType;
  }
);

export {
  nodeInterface,
  nodeField,
};
