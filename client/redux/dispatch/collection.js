import { updateCollection } from './../ducks/collection';

export default (collection, successRedirect) => dispatch => ({
  update: ({ _id, ...update }) =>
    dispatch(updateCollection({ collection, selector: _id, update, successRedirect })),
});
