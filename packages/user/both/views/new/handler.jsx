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

User.Handlers.New = React.createClass({
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
            <Form schema={User.Schema} onSubmit={this._handleSubmit}>
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
    Accounts.createUser(user, (err) => {
      if(err) throw new Meteor.Error(err);
      this.history.pushState(null, '/account')
    })
  }

});