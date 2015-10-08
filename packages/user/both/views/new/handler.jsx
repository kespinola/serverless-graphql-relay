const {
  Card,
  CardHeader,
  RaisedButton,
  TextField,
  Avatar,
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
          <UserSessionForm
            title='Welcome' 
            subtitle='Sign up using your favorite social network or directly.'
            avatar={<Avatar><i class="material-icons">person_add</i></Avatar>}
            onSubmit={this._handleSubmit} 
            />
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
