const {
  Card,
  RaisedButton,
  TextField,
  } = MUI;

const {
  Row,
  Col,
  } = Flexgrid;

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
                  onClick={() => !Meteor.userId() && Meteor[`loginWith${account}`]({}, (err) => { throw new Meteor.Error('Login failed', err)})}
                  />
              )
            })}
            <span>or</span>
            <form>
              <TextField fullWidth floatingLabelText='Email' type='email'/>
              <TextField fullWidth floatingLabelText='Password' type='password'/>
              <TextField fullWidth type='submit'/>
            </form>
          </Card>
        </Col>
      </Row>
    )
  },

});