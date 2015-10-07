const {
  Card,
  CardHeader,
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

const newUserSchema = new SimpleSchema({
  
  email : {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  
  password: {
    type: String,
  }
  
});

User.Handlers.New = React.createClass({
  
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
            <h1>Welcome</h1>
            <h2>Sign up using favorite social network or directly.</h2>
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
            <UserSessionForm onSubmit={this._handleSubmit} />
          </Card>
        </Col>
      </Row>
    )
  },
  
  _handleSubmit(user){
    Accounts.createUser(user, (err) => {
      if(err) throw Meteor.Error(err);
      this.history.pushState(null, '/account')
    })
  }

});
