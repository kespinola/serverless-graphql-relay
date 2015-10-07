injectTapEventPlugin();

const { History, Link, } = ReactRouter;

const {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  DatePicker,
  LeftNav,
  } = MUI;

const { ThemeManager, DarkRawTheme } = Styles;

const { Container, Row, Col } = Flexgrid;

const barStyle = {
  top: 0,
  left: 0,
};

let menuItems = [
  { route: '/blog', text: 'Blog' },
];

if(Meteor.isClient && Meteor.user()) {
  menuItems = menuItems.concat([  
    { route: '/sign-up', text: 'Sign Up' },
    { route:'/login', text: 'Login' }
  ]);
} else {
  menuItems = menuItems.concat([
    { route: '/account', text: 'Account' }
  ]);
}

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
        <AppBar style={barStyle} onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() } title={<Link to='/'>App Start</Link>}/>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={(e, i, {route}) => this.history.pushState(null, route)} />
        <Container fluid={true} className='app-container'>
          {this.props.children}
        </Container>
      </AppCanvas>
    );
  },

});
