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
  FlatButton,
} = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const { Container, Row, Col } = Flexgrid;

const barStyle = {
  top: 0,
  left: 0,
};

let menuItems = [
  {route: '/blog', text: 'Blog'},
  {route: '/roles', text: 'Roles'},
];

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
    
    if(Meteor.userId()){
      iconSet = (
        <IconMenu onItemTouchTap={this._handleTap} iconButtonElement={<IconButton><Avatar>{first_name.charAt(0).toUpperCase()}</Avatar></IconButton>}>
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
          title={<Link to='/'><h2>App Starter</h2></Link>}
          iconElementRight={iconSet}
          />
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems}
                 onChange={(e, i, {route}) => this.history.pushState(null, route)}/>
        <Container fluid={true} className='app-container'>
          {this.props.children}
        </Container>
      </AppCanvas>
    );
  },
  
  componentDidMount(){
    var ss = document.createElement("link");
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
