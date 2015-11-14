/* global injectTapEventPlugin, Meteor, React, ReactRouter, MUI, Flexgrid, Roles, Role, User, Site, ReactMeteorData, App, Page, R */

const { forEach, isNil } = R;
injectTapEventPlugin();

function areAllHandlersReady() {
  let isReady = true;
  forEach(arg => {
    if (!isReady) return false;
    if (!arg.ready()) isReady = false;
  }, arguments);
  return isReady;
}

const { History } = ReactRouter;

const {
  AppCanvas,
  AppBar,
  Avatar,
  Styles,
  IconMenu,
  IconButton,
  MenuItem,
  LeftNav,
  FontIcon,
  FlatButton,
  Dialog,
} = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const barStyle = {
  top: 0,
  left: 0,
};

App.Handlers.Index = React.createClass({

  propTypes: {
    location: React.PropTypes.object,
    children: React.PropTypes.node,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [History, ReactMeteorData],

  getInitialState() {
    return {
      muiTheme: DarkRawTheme,
    };
  },

  getChildContext() {
    const { muiTheme } = this.state;
    const {
      site = {},
    } = this.data;
    const { theme } = site;

    return {
      muiTheme: ThemeManager.getMuiTheme(theme || muiTheme),
    };
  },

  componentDidMount() {
    const ss = document.createElement('link');
    ss.type = 'text/css';
    ss.rel = 'stylesheet';
    ss.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.getElementsByTagName('head')[0].appendChild(ss);
  },

  componentWillReceiveProps({location}) {
    if (location.key !== this.props.location.key) {
      this.previous = {
        children: this.props.children,
        path: this.props.location.pathname,
      };
    }
  },

  componentDidUpdate() {
    const { location } = this.props;

    const { dialog } = this.refs;

    if (location.state && location.state.modal && !dialog.isOpen()) dialog.show();
  },

  onDismiss() {
    this.history.pushState(null, this.previous.path);
  },

  getMeteorData() {
    const domain = Meteor.settings.public.domain;
    const siteHandler = Meteor.subscribe('siteByDomain', domain);
    const userHandler = Meteor.subscribe('user');
    const rolesHandler = Meteor.subscribe('roles');
    const navHandler = Meteor.subscribe('navFromPages');
    const isReady = areAllHandlersReady(
      siteHandler,
      userHandler,
      rolesHandler,
      navHandler
    );
    return {
      isReady,
      user: User.Collection.findOne(Meteor.userId()) || {},
      site: Site.Collection.findOne({ domain }) || {},
      nav: Page.Collection
              .find({showInNav: true})
              .map(({title: text, pathname: route}) => { return { text, route }; }),
    };
  },

  previous: {
    children: null,
    path: null,
  },

  _onNavChange(event, index, {route, location = null}) {
    this.history.pushState(location, route);
  },

  _onTap(event, {props}) {
    const { logout, to } = props;
    if (logout) {
      Meteor.logout(() => {
        this.history.pushState(null, '/login');
      });
    }else if (to) {
      this.history.pushState(null, to);
    }
  },

  render() {
    const { location } = this.props;
    const {
      user: { fullName = '' },
      site,
      nav,
    } = this.data;


    const { domain, owner, title: siteTitle } = site;
    let state = location.state;
    if (isNil(state)) state = {};
    const { title: modalTitle = '', modal = false } = state;

    const userId = Meteor.userId();

    let iconSet;

    const menuItems = [
      {
        leftIcon: (<FontIcon className="material-icons">smartphone</FontIcon>),
        route: '/blog',
        text: 'Blog',
      },
      ... nav,
    ];

    if (owner === userId) {
      menuItems.push({
        route: '/configure',
        location: {
          modal: true,
          title: `Configure ${domain} Settings`,
        },
        text: 'Site Configure',
      });
    }

    if (Roles.userIsInRole(userId, Role.WEBMASTER)) {
      menuItems.push({
        leftIcon: (<FontIcon className="material-icons">lock</FontIcon>),
        type: MenuItem.Types.NESTED,
        text: 'Manage',
        items: [
          {
            leftIcon: (<FontIcon className="material-icons">people</FontIcon>),
            route: '/roles',
            text: 'Role',
          },
          {
            route: '/users',
            text: 'Users',
          },
          {
            route: '/sites',
            text: 'Sites',
          },
        ],
      });
    }

    if (userId) {
      iconSet = (
        <IconMenu
          onItemTouchTap={this._onTap}
          iconButtonElement={(
            <IconButton>
              <Avatar>{fullName.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          )}
          >
          <MenuItem index={0} to="/account">Account</MenuItem>
          <FlatButton index={1} logout primary label="Logout" />
        </IconMenu>
      );
    }else {
      iconSet = (
        <IconMenu
          onItemTouchTap={this._onTap}
          iconButtonElement={<FlatButton>Register</FlatButton>}
        >
          <MenuItem index={0} to="/sign-up">Sign Up</MenuItem>
          <FlatButton index={1} label="Log in" to="/login" />
        </IconMenu>
      );
    }

    return (
      <AppCanvas>
        <AppBar
          style={barStyle}
          title={siteTitle}
          onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() }
          iconElementRight={iconSet}
        />
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          onChange={this._onNavChange}
        />
        {modal ? this.previous.children : this.props.children}
        <Dialog
          ref="dialog"
          title={modalTitle}
          onDismiss={this.onDismiss}
          >
          {modal ? this.props.children : null}
        </Dialog>
      </AppCanvas>
    );
  },

});
