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
            {accounts.map(account => {
              return (
                <RaisedButton
                  key={account}
                  label={account}
                  fullWidth
                  onClick={() => !Meteor.userId() && Meteor[`loginWith${account}`]({}, (err) => { throw new Meteor.Error('Login failed', err)})}
                  />
              )
            })}
            <span>or</span>
            <Form schema={newUserSchema} onSubmit={this._handleSubmit}>
              <Field name='email' component={TextField} floatingLabelText='Email' fullWidth />
              <Field name='password' component={TextField} floatingLabelText='Password' type='password' fullWidth/>
              <TextField fullWidth type='submit' />
            </Form>
          </Card>
        </Col>
      </Row>
    )
  },

  _handleSubmit(user){
    debugger;
    Accounts.createUser(user, (err) => {
      if(err) throw new Meteor.Error(err);
      debugger;
      this.history.pushState(null, '/account')
    })
  }

});
