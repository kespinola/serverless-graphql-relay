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
} = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const { Container, Row, Col } = Flexgrid;

const barStyle = {
  top: 0,
  left: 0,
};

App.Handler = React.createClass({

  mixins: [History, ReactMeteorData],
  
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
    };
  },

  getMeteorData() {
    return {
      user: Meteor.user() || {},
    };
  },
  
  render() {
    
    const {
      user,
    } = this.data;
    
    const {
      profile = {},
    } = user;
    
    const {
      first_name = '',
    } = profile;
    
    let iconSet;

    let menuItems = [
      {
        leftIcon: (<FontIcon className='material-icons'>smartphone</FontIcon>),
        route: '/blog',
        text: 'Blog'
      },
    ];
    
    const userId = Meteor.userId();

    if(Roles.userIsInRole(userId, 'webmaster')){
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
          header={<Link to='/'><h1>App Starter</h1></Link>}
          docked={false} 
          menuItems={menuItems}
          onChange={(e, i, {route}) => this.history.pushState(null, route)}
          />
        <Container fluid={true} className='app-container'>
          {this.props.children}
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
  
  _handleTap(e, {props}){
    
    const {
      logout,
      to,
    } = props;
    
    if(logout){
      Meteor.logout(()=> {
        this.history.pushState(null, '/login');
      }); 
    }else if(to){
      this.history.pushState(null, to);
    }
    
  },

});
