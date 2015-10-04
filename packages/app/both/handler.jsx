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

const menuItems = [
  { route: '/sign-up', text: 'Sign Up' },
  { route: '/blog', text: 'Blog' },
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
        <AppBar style={barStyle} onLeftIconButtonTouchTap={() => this.refs.leftNav.toggle() } title={<Link to='/'>App Starter</Link>}/>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={(e, i, {route}) => this.history.pushState(null, route)} />
        <Container fluid={true} className='app-container'>
          {this.props.children}
        </Container>
      </AppCanvas>
    );
  },

});
