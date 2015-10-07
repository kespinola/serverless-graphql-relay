const {
  Card,
  RaisedButton,
  TextField,
  } = MUI;

const {
  Row,
  Col,
  } = Flexgrid;

const {
  Form,
  Field,
  } = AutoForm;

const {
  History,
  } = ReactRouter;

User.Handlers.Session = React.createClass({

  mixins: [History],

  getDefaultProps(){
    return {
      accounts: [
        'Facebook',
        'Google',
      ]
    }
  },
  render(){
    const {
      accounts,
      } = this.props;
    return (
      <Row centerXs>
        <Col xs={10} sm={6}>
          <Card>
            <h1>Login</h1>
            {accounts.map(account => {
              return (
                <RaisedButton
                  key={account}
                  label={account}
                  fullWidth
                  onClick={this._handleAccountClick.bind(null, account)}
                  />
              )
            })}
            <span>or</span>
            <UserSessionForm onSubmit={this._handleSubmit}/>
          </Card>
        </Col>
      </Row>
    )
  },
  
  _handleAccountClick(account){
    Meteor[`loginWith${account}`]({}, (err) => { 
      throw Meteor.Error('Login failed', err)
    })
  },

  _handleSubmit(user){
    Accounts.loginWithPassword(user, (err) => {
      if(err) throw Meteor.Error(err);
      this.history.pushState(null, '/account')
    })
  }

});
