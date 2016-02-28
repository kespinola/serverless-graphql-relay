import { showDialog, hideDialog } from './../ducks/dialog';

export default scope => dispatch => ({
  showDialog: () => dispatch(showDialog(scope)),
  hideDialog: () => dispatch(hideDialog(scope)),
});
