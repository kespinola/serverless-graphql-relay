injectTapEventPlugin();

const { History, Link, } = ReactRouter;

const {
  AppCanvas,
  AppBar,
  Avatar,
  Styles,
  RaisedButton,
  DatePicker,
  IconMenu,
  IconButton,
  MenuItem,
  Menu,
  LeftNav,
  FontIcon,
  FlatButton,
  Dialog,
} = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const { Container, Row, Col } = Flexgrid;

const {
  isEmpty,
} = R;

const barStyle = {
  top: 0,
  left: 0,
};

App.Handlers.Root = React.createClass({

  mixins: [History, ReactMeteorData],

  previous: {
    children: null,
    path: null,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState(){
    return {
      muiTheme: DarkRawTheme,
    }
  },

  getChildContext() {
    const {
      muiTheme
    } = this.state;
    const {
      site = {},
    } = this.data;

    const {
      theme,
    } = site;

    return {
      muiTheme: ThemeManager.getMuiTheme(theme || muiTheme)
    };
  },

  getMeteorData() {
    const domain = Meteor.settings.public.domain;
    const siteHandler = Meteor.subscribe('siteByDomain', domain);
    const userHandler = Meteor.subscribe('user');

    return {
      user: User.Collection.findOne(Meteor.userId()) || {},
      site: Site.Collection.findOne({domain}) || {}
    };
  },

  componentWillReceiveProps({location}) {

    if(location.key !== this.props.location.key){
      this.previous = {
        children: this.props.children,
        path: this.props.location.pathname,
      }
    }

  },

  render() {

    const { location = {}, } = this.props;
    const { user, site, } = this.data;

    const { domain, owner, title: siteTitle, } = site;

    const {
      profile = {},
    } = user;

    const {
      first_name = '',
    } = profile;

    const modal = location.state && location.state.modal;

    let title;

    if(modal) title = location.state.title;

    const userId = Meteor.userId();

    let iconSet;

    let menuItems = [
      {
        leftIcon: (<FontIcon className='material-icons'>smartphone</FontIcon>),
        route: '/blog',
        text: 'Blog'
      },
    ];

    if(owner == userId){
      menuItems = menuItems.concat({
        route: '/configure',
        location: {
          modal: true,
          title: `Configure ${domain} Settings`
        },
        text: 'Site Configure'
      });
    }

    if(Roles.userIsInRole(userId, Role.WEBMASTER)){
      menuItems = menuItems.concat({
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

    if(userId){
      iconSet = (
        <IconMenu
          onItemTouchTap={this._handleTap}
          iconButtonElement={<IconButton><Avatar>{first_name.charAt(0).toUpperCase()}</Avatar></IconButton>}
          >
          <MenuItem index={0} to='/account'>Account</MenuItem>
          <FlatButton index={1} logout={true} primary={true} label='Logout' />
        </IconMenu>
      );
    }else{
      iconSet = (
        <IconMenu onItemTouchTap={this._handleTap} iconButtonElement={<FlatButton>Register</FlatButton>}>
          <MenuItem index={0} to='/sign-up'>Sign Up</MenuItem>
          <FlatButton index={1} label='Log in' to='/login' />
        </IconMenu>
      );
    }

    return (
      <AppCanvas>
        <AppBar
          style={barStyle}
          onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() }
          iconElementRight={iconSet}
          />
        <LeftNav
          ref="leftNav"
          header={<Link to='/'><h1>{siteTitle}</h1></Link>}
          docked={false}
          menuItems={menuItems}
          onChange={this._handleNavChange}
          />
        <Container fluid={true} className='app-container'>
          {modal ? this.previous.children : this.props.children}
          <Dialog
            ref='dialog'
            title={title}
            onDismiss={this._handleDismiss}
            >
            {modal ? this.props.children : null}
          </Dialog>
        </Container>
      </AppCanvas>
    );
  },

  componentDidMount(){
    let ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.getElementsByTagName("head")[0].appendChild(ss);
  },

  componentDidUpdate(){
    const {
      location = {},
    } = this.props;

    const {
      dialog,
    } = this.refs;

    if(location.state && location.state.modal && !dialog.isOpen()) dialog.show();
  },

  _handleNavChange(e, i, {route, location = null}){
    this.history.pushState(location, route)
  },

  _handleDismiss(){
    this.history.pushState(null, this.previous.path)
  },

  _handleTap(e, {props}){

    const {
      logout,
      to,
    } = props;

    if(logout){
      Meteor.logout(() => {
        this.history.pushState(null, '/login');
      });
    }else if(to){
      this.history.pushState(null, to);
    }

  },

});
