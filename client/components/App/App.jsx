import React, { PropTypes } from 'react';
import { compose, isEmpty } from 'ramda';
import navControl from './../../decorators/navControl';
import authControl from './../../decorators/authControl';
import userInfo from './../../decorators/userInfo';
import {
  AppCanvas,
  AppBar,
  LeftNav,
  MenuItem,
  RaisedButton,
  ToolbarGroup,
  FlatButton,
  IconMenu,
  Avatar,
} from 'material-ui';

function App(props) {
  const {
    children,
    navControls: {
      actions: { toggleNav, changeRoute },
      open,
    },
    auth: {
      actions: { signOutRequest },
    },
    history: { push },
    user,
  } = props;
  const goHome = push.bind(null, '/');
  const goSignIn = push.bind(null, '/sign-in');
  const goSignUp = push.bind(null, '/sign-up');
  const goAccount = push.bind(null, '/account');
  const goUsers = changeRoute.bind(null, '/users');
  const goRoles = changeRoute.bind(null, '/roles');

  const { initials } = user;
  return (
    <AppCanvas>
      <AppBar
        onTitleTouchTap={goHome}
        title="Prism"
        onLeftIconButtonTouchTap={toggleNav}
        iconElementRight={!isEmpty(user) ? (
          <ToolbarGroup>
            <IconMenu
              iconButtonElement={
                <Avatar>{initials && initials}</Avatar>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem primaryText="Account" onClick={goAccount} />
              <MenuItem primaryText="Logout" onClick={signOutRequest} />
            </IconMenu>
          </ToolbarGroup>
        ) : (
          <ToolbarGroup>
            <FlatButton
              primary
              label="Sign In"
              onClick={goSignIn}
            />
            <RaisedButton
              primary
              label="Sign Up"
              onClick={goSignUp}
            />
          </ToolbarGroup>
        )}
      />
    <LeftNav
      docked={false}
      open={open}
      onRequestChange={toggleNav}
    >
        <MenuItem onClick={goUsers}>Users</MenuItem>
        <MenuItem onClick={goRoles}>Roles</MenuItem>
      </LeftNav>
      <div className="app-container">
        {children}
      </div>
    </AppCanvas>
  );
}

App.propTypes = {
  navControls: PropTypes.object,
  auth: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  children: PropTypes.node,
  user: PropTypes.object,
};

export default compose(
  navControl,
  userInfo,
  authControl,
)(App);
