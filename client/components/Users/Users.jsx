import React from 'react';
import { compose } from 'ramda';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody,
  IconMenu,
  IconButton,
  MenuItem,
  Dialog,
  Toggle,
  FlatButton,
} from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import { Grid, Row, Col } from 'react-flexgrid';
import Profiles from './../../../both/collections/profiles';
import meteorData from './../../decorators/meteorData';
import roleControl from './../../decorators/roleControl';
import dialogControl from './../../decorators/dialogControl';

const getUserSubscribe = ({ role: { changeRole } }) => {
  Meteor.subscribe('profiles');
  Meteor.subscribe('profile', changeRole);
  return {
    profiles: Profiles.find({ }).fetch(),
    roles: Meteor.roles.find({ }).fetch(),
    user: Profiles.findOne({ userId: changeRole }) || {},
  };
};

const users = ({
   profiles,
   roles,
   role: { changeRole, actions: { updateRoles, cancelRoleUpdate, toggleInRole } },
   user: { fullName },
 }) => {
  const roleActions = [
    <FlatButton
      label="Done"
      primary
      onTouchTap={cancelRoleUpdate}
    />,
  ];
  return (
    <Grid fluid>
      <Dialog
        title={`Update Roles for ${fullName}`}
        open={changeRole}
        actions={roleActions}
        onRequestClose={cancelRoleUpdate}
      >
        {roles.map(({ name }) => {
          const toggleCurrentRole = toggleInRole.bind(null, changeRole, name);
          return (
            <Toggle
              key={name}
              label={name}
              onToggle={toggleCurrentRole}
              defaultToggled={Roles.userIsInRole(changeRole, name)}
            />
          );
        })}
      </Dialog>
      <Row>
        <Col xs={12} sm={10} smOffset={1}>
          <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Full Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map(({ userId, fullName }) => {
              const updateRolesForUser = updateRoles.bind(null, userId);
              return (
                <TableRow key={userId}>
                  <TableRowColumn>{fullName}</TableRowColumn>
                  <TableRowColumn>
                    <IconMenu
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    >
                      <MenuItem primaryText="Update Roles" onClick={updateRolesForUser} />
                    </IconMenu>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
          </Table>
        </Col>
      </Row>
    </Grid>
  );
}

export default compose(
  roleControl,
  dialogControl('user/roles'),
  meteorData(
    getUserSubscribe,
  )
)(users);
