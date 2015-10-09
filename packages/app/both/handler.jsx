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
  } = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const { Container, Row, Col } = Flexgrid;

const barStyle = {
  top: 0,
  left: 0,
};

let menuItems = [
  {route: '/blog', text: 'Blog'},
];

App.Handler = React.createClass({

  mixins: [History],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
    };
  },

  render() {
    return (
      <AppCanvas>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <AppBar
          style={barStyle}
          onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() }
          title={<Link to='/'>App Starter Pack</Link>}
          iconElementRight={
            <IconMenu iconButtonElement={<IconButton><Avatar>KE</Avatar></IconButton>}>
              <MenuItem index={0}><Link to='/account'>Account</Link></MenuItem>
              <MenuItem index={1}>Logout</MenuItem>
            </IconMenu>
          }
          />
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems}
                 onChange={(e, i, {route}) => this.history.pushState(null, route)}/>
        <Container fluid={true} className='app-container'>
          {this.props.children}
        </Container>
      </AppCanvas>
    );
  },

});
