injectTapEventPlugin();

const { History, Link, } = ReactRouter;

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

const { Container, Row, Col } = Flexgrid;

const { isEmpty } = R;

const barStyle = {
  top: 0,
  left: 0,
};

App.Handlers.Index = React.createClass({

  propTypes: {
    location: React.PropTypes.object,
  },

  mixins: [History, ReactMeteorData],

  previous: {
    children: null,
    path: null,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      muiTheme: DarkRawTheme,
    }
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

  getMeteorData() {
    const domain = Meteor.settings.public.domain;
    const siteHandler = Meteor.subscribe('siteByDomain', domain);
    const userHandler = Meteor.subscribe('user');
    const rolesHandler = Meteor.subscribe('roles');
    const navHandler = Meteor.subscribe('pageShowNav');

    return {
      user: User.Collection.findOne(Meteor.userId()) || {},
      site: Site.Collection.findOne({ domain }) || {},
      nav: Page.Collection
              .find({showInNav: true})
              .map(({title: text, pathname: route}) => { return { text, route }; }),
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
      }
    }
  },

  componentDidUpdate() {
    const { location } = this.props;

    const { dialog } = this.refs;

    if (location.state && location.state.modal && !dialog.isOpen()) dialog.show();
  },

  _onNavChange(e, i, {route, location = null}) {
    this.history.pushState(location, route)
  },

  onDismiss() {
    this.history.pushState(null, this.previous.path)
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
    const { location = {} } = this.props;
    const {
      user: { fullName = '' },
      site,
      nav,
    } = this.data;

    const { domain, owner, title: siteTitle } = site;

    const modal = location.state && location.state.modal;

    let title;

    if (modal) title = location.state.title;

    const userId = Meteor.userId();

    let iconSet;

    let menuItems = [
      {
        leftIcon: (<FontIcon className='material-icons'>smartphone</FontIcon>),
        route: '/blog',
        text: 'Blog'
      },
      ... nav,
    ];

    if (owner === userId) {
      menuItems.push({
        route: '/configure',
        location: {
          modal: true,
          title: `Configure ${domain} Settings`
        },
        text: 'Site Configure',
      });
    }

    if (Roles.userIsInRole(userId, Role.WEBMASTER)) {
      menuItems.push({
        leftIcon: (<FontIcon className='material-icons'>lock</FontIcon>),
        type: MenuItem.Types.NESTED,
        text: 'Manage',
        items: [
          {
            leftIcon: (<FontIcon className='material-icons'>people</FontIcon>),
            route: '/roles',
            text: 'Role'
          },
          {
            route: '/users',
            text: 'Users'
          },
          {
            route: '/sites',
            text: 'Sites',
          }
        ]
      });
    }

    if (userId) {
      iconSet = (
        <IconMenu
          onItemTouchTap={this._onTap}
          iconButtonElement={<IconButton><Avatar>{fullName.charAt(0).toUpperCase()}</Avatar></IconButton>}
          >
          <MenuItem index={0} to='/account'>Account</MenuItem>
          <FlatButton index={1} logout={true} primary={true} label='Logout' />
        </IconMenu>
      );
    }else{
      iconSet = (
        <IconMenu
          onItemTouchTap={this._onTap}
          iconButtonElement={<FlatButton>Register</FlatButton>}
        >
          <MenuItem index={0} to='/sign-up'>Sign Up</MenuItem>
          <FlatButton index={1} label='Log in' to='/login' />
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
          ref='dialog'
          title={title}
          onDismiss={this.onDismiss}
          >
          {modal ? this.props.children : null}
        </Dialog>
      </AppCanvas>
    );
  },

});
