import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import navControl from './../../decorators/navControl';
import {
  AppCanvas,
  AppBar,
  LeftNav,
  MenuItem,
  RaisedButton,
  ToolbarGroup,
  FlatButton,
} from 'material-ui';

function App(props) {
  const {
    children,
    navControls: {
      actions: { toggleNav },
      open,
    },
    history: { push },
  } = props;

  const goSignIn = push.bind(null, '/sign-in');
  const goSignUp = push.bind(null, '/sign-up');

  return (
    <AppCanvas>
      <AppBar
        title="Prism"
        onLeftIconButtonTouchTap={toggleNav}
        iconElementRight={
          <ToolbarGroup >
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
        }
      />
    <LeftNav
      docked={false}
      open={open}
      onRequestChange={toggleNav}
    >
        <MenuItem>Solution</MenuItem>
      </LeftNav>
      <div className="app-container">
        {children}
      </div>
    </AppCanvas>
  );
}

App.propTypes = {
  navControls: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  children: PropTypes.node,
};

export default compose(
  navControl,
)(App);
