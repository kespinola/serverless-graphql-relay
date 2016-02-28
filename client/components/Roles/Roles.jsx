import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'ramda';
import RoleForm from './../RoleForm';
import userInfo from './../../decorators/userInfo';
import dialogControl from './../../decorators/dialogControl';
import roleControl from './../../decorators/roleControl';
import meteorData from './../../decorators/meteorData';
import { Toolbar, ToolbarGroup, RaisedButton, Dialog } from 'material-ui';

const getRoles = () => {
  Meteor.subscribe('roles');

  return { roles: Meteor.roles.find({ }) };
};


const Roles = ({
  dialog: { open, actions: { showDialog, hideDialog } },
  role: { actions: { createRole } },
  user: { userId },
}) => {
  const onSubmit = ({ name }) => {
    hideDialog();
    createRole(name);
  };
  return (
    <div>
      <Dialog
        open={open}
        onRequestClose={hideDialog}
      >
        <RoleForm
          userId={userId}
          submitLabel="Create Role"
          onSubmit={onSubmit}
        />
      </Dialog>
      <Toolbar>
        <ToolbarGroup float="right">
          <RaisedButton primary label="Create Role" onClick={showDialog} />
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

export default compose(
  dialogControl('roles'),
  userInfo,
  roleControl,
  meteorData(getRoles),
)(Roles);
